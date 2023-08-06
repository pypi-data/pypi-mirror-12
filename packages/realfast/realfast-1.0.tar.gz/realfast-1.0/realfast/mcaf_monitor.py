#! /usr/bin/env python

# Main controller. Sarah Burke Spolaor June 2015
#
# Based on frb_trigger_controller.py by P. Demorest, 2015/02
#
# Listen for OBS packets having a certain 'triggered archiving'
# intent, and perform some as-yet-unspecified action when these
# are recieved.
#

import datetime
import os
import asyncore
import click
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

from realfast import queue_monitor, rtutils, mcaf_library

# set up
rtparams_default = os.path.join(os.path.join(os.path.split(os.path.split(mcaf_library.__file__)[0])[0], 'conf'), 'rtpipe_cbe.conf') # install system puts conf files here. used by queue_rtpipe.py
default_bdfdir = '/lustre/evla/wcbe/data/no_archive'
telcaldir = '/home/mchammer/evladata/telcal'  # then yyyy/mm
workdir = os.getcwd()     # assuming we start in workdir
redishost = os.uname()[1]  # assuming we start on redis host


class FRBController(object):
    """Listens for OBS packets and tells FRB processing about any
    notable scans."""

    def __init__(self, intent='', project='', production=False, verbose=False, rtparams=''):
        # Mode can be project, intent
        self.intent = intent
        self.project = project
        self.production = production
        self.verbose = verbose
        self.rtparams = rtparams

    def add_sdminfo(self, sdminfo):
        config = mcaf_library.MCAST_Config(sdminfo=sdminfo)

        # !!! Wrapper here to deal with potential subscans?

        # Check if MCAST message is simply telling us the obs is finished
        if config.obsComplete:
            logger.info("Received finalMessage=True; This observation has completed.")
            # if completing the desired SB, then do a final rsync
            if self.project in config.projectID:
                logger.info("Final rsync to make workdir copy of SDM %sd complete." % (config.sdmLocation.rstrip('/')))
                rtutils.rsync(config.sdmLocation.rstrip('/'), workdir)  # final transfer to ensure complete SDM in workdir

        elif self.intent in config.intentString and self.project in config.projectID:
            logger.info("Scan %d has desired intent (%s) and project (%s)" % (config.scan, self.intent, self.project))
            bdfloc = os.path.join(default_bdfdir, os.path.basename(config.bdfLocation))

            # If we're not in listening mode, prepare data and submit to queue system
            if self.production:
                filename = config.sdmLocation.rstrip('/')
                scan = int(config.scan)

                assert len(filename) and isinstance(filename, str), 'Filename empty or not a string?'

                # check that SDM is usable by rtpipe. Currently checks spw order and duplicates.
                if rtutils.check_spw(filename, scan) and os.path.exists(bdfloc):
                    logger.info("Processing sdm %s, scan %d..." % (os.path.basename(filename), scan))
                    logger.debug("BDF is in %s\n" % (bdfloc))

                    # 1) copy data into place
                    rtutils.rsync(filename, workdir)
                    filename = os.path.join(workdir, os.path.basename(filename))   # new full-path filename
                    assert 'mchammer' not in filename, 'filename %s is SDM original!'

                    # 2) find telcalfile (use timeout to wait for it to be written)
                    telcalfile = rtutils.gettelcalfile(telcaldir, filename, timeout=60)

                    # 3) if cal available and bdf exists, submit search job and add tail job to monitoring queue
                    if telcalfile:
                        logger.info('Submitting job to rtutils.search with args: %s %s %s %s %s %s %s %s' % ('default', filename, self.rtparams, '', str([scan]), telcalfile, redishost, default_bdfdir))
                        lastjob = rtutils.search('default', filename, self.rtparams, '', [scan], telcalfile=telcalfile, redishost=redishost, bdfdir=default_bdfdir)
                        rtutils.addjob(lastjob.id)                            
                    else:
                        logger.info('No calibration available. No job submitted.')
                else:
                    logger.info("Not submitting scan %d of sdm %s. bdf not found or cannot be processed by rtpipe." % (scan, os.path.basename(filename)))                    
@click.command()
@click.option('--intent', '-i', default='', help='Intent to trigger on')
@click.option('--project', '-p', default='', help='Project name to trigger on')
@click.option('--production', help='Run the code (not just print, etc)', is_flag=True)
@click.option('--verbose', '-v', help='More verbose output', is_flag=True)
@click.option('--rtparams', help='Parameter file for rtpipe. Default is rtpipe_cbe_conf.', default=rtparams_default)
def monitor(intent, project, production, verbose, rtparams):
    """ Monitor of mcaf observation files. 
    Scans that match intent and project are searched (if in production mode).
    Blocking function.
    """

    # Set up verbosity level for log
    if verbose:
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)

    logger.info('mcaf_monitor started')
    logger.info('Looking for intent = %s, project = %s' % (intent, project))
    logger.debug('Running in verbose mode')

    if not production:
        logger.info('Running in test mode')
    else:
        logger.info('Running in production mode')

    # This starts the receiving/handling loop
    controller = FRBController(intent=intent, project=project, production=production, verbose=verbose, rtparams=rtparams)
    sdminfo_client = mcaf_library.SdminfoClient(controller)
    try:
        asyncore.loop()
    except KeyboardInterrupt:
        # Just exit without the trace barf
        logger.info('Escaping mcaf_monitor')

def testrtpipe(filename, paramfile):
    """ Function for a quick test of rtpipe and queue system
    filename should have full path.
    """

    import sdmreader
    sc,sr = sdmreader.read_metadata(filename, bdfdir=default_bdfdir)
    scan = sc.keys()[0]
    telcalfile = rtutils.gettelcalfile(telcaldir, filename, timeout=60)
    lastjob = rtutils.search('default', filename, paramfile, '', [scan], telcalfile=telcalfile, redishost=redishost, bdfdir=default_bdfdir)
    return lastjob
