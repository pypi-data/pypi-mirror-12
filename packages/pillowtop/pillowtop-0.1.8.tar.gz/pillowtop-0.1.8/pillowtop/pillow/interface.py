from abc import ABCMeta, abstractproperty, abstractmethod
from dimagi.utils.logging import notify_exception
from pillowtop.const import CHECKPOINT_MIN_WAIT
from pillowtop.exceptions import PillowtopCheckpointReset
from pillowtop.logger import pillow_logging


class PillowBase(object):
    """
    This defines the external pillowtop API. Everything else should be considered a specialization
    on top of it.
    """
    __metaclass__ = ABCMeta

    changes_seen = 0  # a rolling count of how many changes have been seen by the pillow

    @abstractproperty
    def document_store(self):
        """
        Returns a DocumentStore instance for retreiving documents.
        """
        pass

    @abstractproperty
    def checkpoint(self):
        """
        Returns a PillowtopCheckpoint instance dealing with checkpoints.
        """
        pass

    @abstractmethod
    def get_change_feed(self):
        """
        Returns a ChangeFeed instance for iterating changes.
        """
        pass

    def get_last_checkpoint_sequence(self):
        return self.checkpoint.get_or_create()['seq']

    def get_checkpoint(self, verify_unchanged=False):
        return self.checkpoint.get_or_create(verify_unchanged=verify_unchanged)

    def set_checkpoint(self, change):
        pillow_logging.info(
            "(%s) setting checkpoint: %s" % (self.checkpoint.checkpoint_id, change['seq'])
        )
        self.checkpoint.update_to(change['seq'])

    def reset_checkpoint(self):
        self.checkpoint.reset_checkpoint()

    def run(self):
        """
        Main entry point for running pillows forever.
        """
        pillow_logging.info("Starting pillow %s" % self.__class__)
        self.process_changes(since=self.get_last_checkpoint_sequence(), forever=True)

    def process_changes(self, since, forever):
        """
        Process changes from the changes stream.
        """
        try:
            for change in self.get_change_feed().iter_changes(since=since, forever=forever):
                if change:
                    try:
                        self.processor(change)
                    except Exception as e:
                        notify_exception(None, u'processor error {}'.format(e))
                        raise
                else:
                    self.checkpoint.touch(min_interval=CHECKPOINT_MIN_WAIT)
        except PillowtopCheckpointReset:
            self.changes_seen = 0
            self.process_changes(since=self.get_last_checkpoint_sequence(), forever=forever)

    @abstractmethod
    def processor(self, change, do_set_checkpoint=True):
        pass


class ConstructedPillow(PillowBase):
    """
    An almost-implemented Pillow that relies on being passed the various constructor
    arguments it needs.
    """
    __metaclass__ = ABCMeta

    def __init__(self, document_store, checkpoint, change_feed):
        self._document_store = document_store
        self._checkpoint = checkpoint
        self._change_feed = change_feed

    def document_store(self):
        return self._document_store

    def checkpoint(self):
        return self._checkpoint

    def get_change_feed(self):
        return self._change_feed
