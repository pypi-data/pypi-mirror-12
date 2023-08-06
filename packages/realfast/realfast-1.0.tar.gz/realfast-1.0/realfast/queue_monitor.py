import logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
from redis import Redis
from rq.queue import Queue
from rq.registry import FinishedJobRegistry
import time, sys, os
import subprocess, click, shutil
import sdmreader
from realfast import rtutils

# set up  
conn0 = Redis(db=0)
conn = Redis(db=1)   # db for tracking ids of tail jobs
trackercount = 2000  # number of tracking jobs (one per scan in db=1) to monitor 
sdmwait = 3600    # timeout in seconds from last update of sdm to assume writing is finished
snrmin = 6.0
sdmArchdir = '/home/mchammer/evla/sdm/' #!!! THIS NEEDS TO BE SET BY A CENTRALIZED SETUP/CONFIG FILE. # dummy dir: /home/cbe-master/realfast/fake_archdir
bdfArchdir = '/lustre/evla/wcbe/data/archive/' #!!! THIS NEEDS TO BE SET BY A CENTRALIZED SETUP/CONFIG FILE.
redishost = os.uname()[1]  # assuming we start on redis host

@click.command()
@click.option('--qname', default='default', help='Name of queue to monitor')
@click.option('--triggered/--all', default=False, help='Triggered recording of scans or save all? (default: all)')
@click.option('--archive', '-a', is_flag=True, help='After search defines goodscans, set this to create new sdm and archive it.')
@click.option('--verbose', '-v', help='More verbose (e.g. debugging) output', is_flag=True)
@click.option('--production', help='Run code in full production mode (otherwise just runs as test)', is_flag=True)
@click.option('--threshold', help='Detection threshold used to trigger scan archiving (if --triggered set).', type=float, default=0.)
@click.option('--slow', '-s', help='Create local measurement set of all data integrated to this timescale (in seconds).', default=0.)
@click.option('--bdfdir', help='Directory to look for bdfs.', default='/lustre/evla/wcbe/data/no_archive')
def monitor(qname, triggered, archive, verbose, production, threshold, slow, bdfdir):
    """ Blocking loop that prints the jobs currently being tracked in queue 'qname'.
    Can optionally be set to do triggered data recording (archiving).
    """

    if verbose:
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)

    if production:
        logger.info('***WARNING: Running the production version of the code.***')
        if archive:
            logger.info('***WARNING: Will do archiving.***')
    else:
        logger.info('Running test version of the code. Will NOT actually archive but will print messages.')

    logger.debug('Monitoring queue running in verbose/debug mode.')
    logger.info('Monitoring queue %s in %s recording mode...' % (qname, ['all', 'triggered'][triggered]))
    q = Queue(qname, connection=conn0)

    jobids0 = []
    q0hist = [0]
    q1hist = [0]
    sdmlastwritten = {}; sdmcount = {}
    while 1:
        jobids = conn.scan(cursor=0, count=trackercount)[1]

        # track history of queue sizes. saves/prints if values change.
        q0len = len(q.jobs)
        q1len = len(jobids)
        if (q0len != q0hist[-1]) or (q1len != q1hist[-1]):
            q0hist.append(q0len)  # track latest size
            q1hist.append(q1len)
            q0hist = q0hist[-10:]   # keep most recent 10
            q1hist = q1hist[-10:]
            logger.info('** Queue size history (newest to oldest) **')
            logger.info('Worker queue:\t%s' % q0hist[::-1])
            logger.info('Tail queue:\t%s' % q1hist[::-1])

        if jobids0 != jobids:
            logger.info('Tracking %d jobs' % len(jobids))
            logger.debug('jobids: %s' % str(jobids))
            sys.stdout.flush()
            jobids0 = jobids

        # filter all jobids to those that are finished pipeline jobs. now assumes only RT.pipeline jobs in q
        badjobs = [jobids[i] for i in range(len(jobids)) if not q.fetch_job(jobids[i])]  # clean up jobids list first
        if badjobs:
            logger.info('Cleaning up jobs in tail queue with no counterpart in working queue.')
            for jobid in badjobs:
                rtutils.removejob(jobid)

        # update dict of sdm last written times whenever new scan appears for that filename
        filenames = [q.fetch_job(jobid).args[0]['filename'] for jobid in jobids]
        for filename in set(filenames):
            count = filenames.count(filename)
            if sdmcount.has_key(filename):
                if count > sdmcount[filename]:  # if new scan added for filename, then update time stamp
                    logger.info('Updated last written time for %s' % filename)
                    sdmlastwritten[filename] = time.time()
                sdmcount[filename] = count
            else:  # if no key exists, this one is new, so set initialize
                logger.info('Initialized last written time for %s' % filename)
                sdmlastwritten[filename] = time.time()
                sdmcount[filename] = count

        finishedjobs = [q.fetch_job(jobid) for jobid in jobids if q.fetch_job(jobid).is_finished] # and ('RT.pipeline' in q.fetch_job(jobid).func_name)]
        
        # iterate over list of finished tail jobs (one expected per scan)
        for job in finishedjobs:
            d, segments = job.args
            logger.info('Job %s finished with filename %s, scan %s, segments %s' % (str(job.id), d['filename'], d['scan'], str(segments)))

            jobids = conn.scan(cursor=0, count=trackercount)[1]  # refresh jobids to get latest scans_in_queue
            scans_in_queue = [q.fetch_job(jobid).args[0]['scan'] for jobid in jobids if q.fetch_job(jobid).args[0]['filename'] == d['filename']]
            logger.debug("Scans in queue for filename %s: %s" % (d['filename'], scans_in_queue))

            # To be done for each scan:

            # Error check directory usage/settings
            assert 'bunker' not in bdfdir, '*** BDFDIR ERROR: No messing with bunker bdfs!'
            assert 'telcal' not in bdfdir, '*** BDFDIR ERROR: No messing with telcal bdfs!'
            assert 'mchammer' not in d['workdir'] and 'mctest' not in d['workdir'], '*** WORKDIR ERROR: bunker, mchammer, and mctest are off-limits for writing!'
            assert 'mchammer' not in d['filename'] and 'mctest' not in d['filename'], '*** FILENAME ERROR: bunker, mchammer, and mctest are off-limits for writing!'

            # 0) may want to check that other segments finished for this scan. should do so by default ordering in queue

            # 1) merge segments. removes segment pkls, if successfully merged.
            try:
                rtutils.cleanup(d['workdir'], d['fileroot'], [d['scan']])
            except:
                logger.error('Could not cleanup cands/noise files for fileroot %s and scan %d. Removing from tracking queue.' % (d['fileroot'], d['scan']))
                rtutils.removejob(job.id)
                scans_in_queue.remove(d['scan'])
                continue

            # 2) get metadata (and check that file still available to work with)
            try:
                # Each sc key contains a dictionary. The key is the scan number.                            
                sc,sr = sdmreader.read_metadata(d['filename'], bdfdir=bdfdir)
            except:
                logger.error('Could not parse sdm %s. Removing from tracking queue.' % d['filename'])
                rtutils.removejob(job.id)
                scans_in_queue.remove(d['scan'])
                continue

            # 3) aggregate cands/noise files and plot available so far. creates/overwrites the merge pkl
            try:
                rtutils.plot_summary(d['workdir'], d['fileroot'], sc.keys(), snrmin=snrmin)
            except:
                logger.info('Trouble merging scans and plotting for scans %s in file %s. Removing from tracking queue.' % (str(sc.keys()), d['fileroot']))
                rtutils.removejob(job.id)
                scans_in_queue.remove(d['scan'])
                continue

            # 4) if last scan of sdm, start end-of-sb processing. requires all bdf written or sdm not updated in sdmwait period
            allbdfwritten = all([sc[i]['bdfstr'] for i in sc.keys()])
            sdmtimeout = time.time() - sdmlastwritten[d['filename']] > sdmwait
            logging.debug('allbdfwritten = %s. sdmtimeout = %s.' % (str(allbdfwritten), str(sdmtimeout)))
            if (allbdfwritten or sdmtimeout) and (len(scans_in_queue) == 1) and (d['scan'] in scans_in_queue):
                logger.info('This job processed scan %d, the last scan in the queue for %s.' % (d['scan'], d['filename']))

                # 4-1) Run slow transients search
                if slow > 0:
                    logger.info('Creating measurement set for %s' % d['filename'])
                    rtutils.linkbdfs(d['filename'], sc, bdfdir)

                    # Submit slow-processing job to our alternate queue.
                    allscanstr = ','.join(str(s) for s in sc.keys())
                    rtutils.integrate(d['filename'], allscanstr, slow, redishost)                    

                # 4-2) if doing triggered recording, get scans to save. otherwise, save all scans.
                if triggered:
                    logger.debug('Triggering is on. Saving cal scans and those with candidates.')
                    goodscans = [s for s in sc.keys() if 'CALIB' in sc[s]['intent']]  # minimal set to save

                    # if merged cands available, identify scans to archive.
                    # ultimately, this could be much more clever than finding non-zero count scans.
                    if os.path.exists(os.path.join(d['workdir'], 'cands_' + d['fileroot'] + '_merge.pkl')):
                        goodscans += rtutils.find_archivescans(os.path.join(d['workdir'], 'cands_' + d['fileroot'] + '_merge.pkl'), threshold)
                        ##!!! For rate tests: print cand info !!!
                        #rtutils.tell_candidates(os.path.join(d['workdir'], 'cands_' + d['fileroot'] + '_merge.pkl'), os.path.join(d['workdir'], 'cands_' + d['fileroot'] + '_merge.snrlist'))
                    goodscans = uniq_sort(goodscans) #uniq'd scan list in increasing order
                else:
                    logger.debug('Triggering is off. Saving all scans.')
                    goodscans = sc.keys()

                goodscanstr= ','.join(str(s) for s in goodscans)
                logger.info('Found the following scans to archive: %s' % goodscanstr)

                # 4-3) Edit SDM to remove no-cand scans. Perl script takes SDM work dir, and target directory to place edited SDM.
                if archive:
                    movetoarchive(d['filename'], d['workdir'].rstrip('/'), goodscanstr, production, bdfdir)
                else:
                    logger.debug('Archiving is off.')                            
 
                # Email Sarah the plots from this SB so she remembers to look at them in a timely manner.
                try:
                    imgbase = os.path.join(d['workdir'], 'plot_' + d['fileroot'])
                    subprocess.call("""echo "%d of %d scans archived.\nScans archived: %s\n" | mailx -s 'REALFAST: block %s finished processing.' -a %s_dmt.png -a %s_dmcount.png -a %s_impeak.png -a %s.noisehist.png -a %s.normprob.png sarahbspolaor@gmail.com""" % (len(goodscans),len(sc.keys()),goodscanstr,d['fileroot'],imgbase,imgbase,imgbase,imgbase,imgbase), shell=True)
                except:
                    logger.error("Something's wrong with sarah's mailx subprocess call; plots not emailed.")
                    continue

                # 6) organize cands/noise files?
            else:
                logger.info('Scan %d is not last scan or %s is not finished writing.' % (d['scan'], d['filename']))
                logger.debug('List of bdfstr: %s. scans_in_queue = %s.' % (str([sc[i]['bdfstr'] for i in sc.keys()]), str(scans_in_queue)))

            # job is finished, so remove from db
            logger.info('Removing job %s from tracking queue.' % job.id)
            rtutils.removejob(job.id)
            scans_in_queue.remove(d['scan'])
            sys.stdout.flush()

        sys.stdout.flush()
        time.sleep(1)

def movetoarchive(filename, workdir, goodscanstr, production, bdfdir):
    """ Moves sdm and bdf associated with filename to archive.
    filename is sdmfile. workdir is place with file.
    goodscans is comma-delimited list, which is optional.
    production is boolean for production mode.
    """

    assert filename, 'Need filename to move to archive'

    if not workdir:
        workdir = os.getcwd()
    sc,sr = sdmreader.read_metadata(filename, bdfdir=bdfdir)
    if not goodscanstr:
        goodscans = [s for s in sc.keys() if sc[s]['bdfstr']]
    else:
        goodscans = [int(s) for s in goodscanstr.split(',')]

    logger.debug('Archiving is on.')
    logger.debug('Archiving directory info:')
    logger.debug('Workdir: %s' % workdir)    # !! could just be set to os.getcwd()?
    logger.debug('SDMarch: %s' % sdmArchdir)
    logger.debug('SDM:     %s' % filename)
    logger.debug('BDFarch: %s' % bdfArchdir)
    logger.debug('BDFwork: %s' % os.path.dirname(sc[sc.keys()[0]]['bdfstr']))
    assert 'bunker' not in os.path.dirname(sc[sc.keys()[0]]['bdfstr']), '*** BDFSTR ERROR: No messing with bunker bdfs!'
    assert 'telcal' not in os.path.dirname(sc[sc.keys()[0]]['bdfstr']), '*** BDFSTR ERROR: No messing with telcal bdfs!'

    subprocess.call(['sdm_chop-n-serve.pl', filename, workdir, goodscanstr])   # would be nice to make this Python

    # 4) copy new SDM and good BDFs to archive locations
                    
    # Set up names of source/target SDM files
    sdmORIG = filename.rstrip('/')
    sdmFROM = filename.rstrip('/') + "_edited"
    sdmTO   = os.path.join(sdmArchdir, os.path.basename(filename.rstrip('/')))

    # Archive edited SDM
    if not production:
        logger.info('TEST MODE. Would archive SDM %s to %s' % ( sdmFROM, sdmTO ))
        touch(sdmFROM + ".archived")
    else:
        logger.info('Archiving SDM %s to %s' % ( sdmFROM, sdmTO ))
        rtutils.rsync( sdmFROM, sdmTO )

    # Remove old SDM and old edited copy
    if not production:
        logger.info('TEST MODE. Would delete edited SDM %s' % sdmFROM )
        logger.info('TEST MODE. Would delete original SDM %s' % sdmORIG )
        touch(sdmFROM + ".delete")
        touch(sdmORIG + ".delete")
    else: 
        logger.debug('Deleting edited SDM %s' % sdmFROM )
        shutil.rmtree( sdmFROM )
        logger.info('***NOTE (%s): not deleting unedited SDM files yet' % sdmORIG )
        #!!!logger.debug('Deleting original SDM %s' % sdmORIG ) #!!! WHEN CASEY SAYS GO
        #!!!shutil.rmtree( sdmORIG ) #!!! PUT THIS LINE IN WHEN CASEY SAYS GO

    # Archive the BDF (via hardlink to archdir)
    for scan in goodscans:
        bdfFROM = sc[scan]['bdfstr']
        bdfTO   = os.path.join(bdfArchdir, os.path.basename(bdfFROM))
        if not production:
            logger.info('TEST MODE. Would hardlink %s to %s' % ( bdfFROM, bdfTO ))
            touch( bdfFROM + ".archived" )
        else:
            logger.debug('Hardlinking %s to %s' % ( bdfFROM, bdfTO ))
            os.link( bdfFROM, bdfTO )
 
    # Now delete all the hardlinks in our BDF working directory for this SB.
    for scan in goodscans:
        bdfREMOVE = sc[scan]['bdfstr'].rstrip('/')
        if not production:
            logger.info('TEST MODE. Would remove BDF %s' % bdfREMOVE )
            touch( bdfREMOVE + '.delete' )
        else:
            logger.debug('Removing BDF %s' % bdfREMOVE )
#            logger.info('***NOTE (%s): not deleting no_archive hardlinks yet' % bdfREMOVE)
            os.remove( bdfREMOVE ) #!!! WHEN CASEY SAYS GO

def getfinishedjobs(qname='default'):
    """ Get list of job ids in finished registry.
    """

    q = Queue(qname, connection=conn0)
    return FinishedJobRegistry(name=q.name, connection=conn0).get_job_ids()

# Temporary method for creating an empty file.
def touch(path):
    with open(path, 'a'):
        os.utime(path, None)

# Remove duplicates in a list (NOT order-preserving!)
def uniq_sort(lst):
    theset = set(lst)
    thelist = list(theset)
    thelist.sort()
    return thelist

