from __future__ import division, absolute_import, with_statement
# Copyright (c) 2015 University of Louisiana at Lafayette.
# All rights reserved.

import sys
import logging

from progressbar import ProgressBar, ETA, AdaptiveETA, Percentage, SimpleProgress, Timer


class EtaTimer(object):
    """ Keep track of how much processing time is left.
    Initialize object with the number of items that need to be processed.  After
    every individual item is processed, call t.tick().  This function will keep
    an internal counter of items left and every inc ticks report estimated time
    left.

    When the internal counter reaches zero, ding() is automatically
    called and final statistics are reported. The timer can manually be stopped
    by a call to ding() as well.
    """
    def __init__(self, total, name="", stream=sys.stderr):
        """
        Arguments:
            total:  Total number of items that will need processing.
            stream:     File descriptor to write to
        """
        self.name = name
        self.eta_window = 0
        self.total = total
        self.pbar = ProgressBar(max_value=total, widgets=self._default_widgets(), fd=stream)
        # Ensure starts at 0
        self.pbar.update(0)

    @property
    def finished(self):
        return self.pbar.finished

    @property
    def currval(self):
        return self.pbar.value

    @property
    def max_value(self):
        return self.pbar.max_value

    def tick(self, *args):
        """ Finished an item.
        The *args is so this can be used as an arbitrary callback
        """
        log = logging.getLogger(__name__)
        try:
            self.pbar.update(self.currval + 1)
        except ValueError:
            # Update value was too large. I don't ever want to generate an
            # error, so simply ignore it.
            log.debug("ProgressBar update called with value larger than max of %d", self.max_value)
            self.pbar.update(self.currval)

    def ding(self):
        """ Time's up. Ding! """
        self.pbar.finish()

    # progressbar2 adapted code
    def _default_widgets(self):
        if self.eta_window == 0:
            eta = ETA()
        else:
            eta = AdaptiveETA(num_samples=self.eta_window)
        return [
            Percentage(), ' (', SimpleProgress(), ') ',
            Timer(), ' ', eta,
        ]


class DummyTimer(object):
    """ A mock of timer that does nothing.
    Exists as a default argument anytime timer is user.
    Allows for easy code.  Set this as the default argument,
    then simply pretend like you always have a timer.
    """
    finished = True

    def tick(self):
        pass

    def ding(self):
        pass

    def done(self):
        return True
