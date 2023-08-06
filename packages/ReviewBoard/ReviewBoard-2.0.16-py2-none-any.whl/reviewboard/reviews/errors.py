from __future__ import unicode_literals


class OwnershipError(ValueError):
    """An error that occurs when a user does not own a review request."""
    pass


class PermissionError(Exception):
    """An error that occurs when a user does not have required permissions."""
    pass


class PublishError(Exception):
    """An error that occurs when attempting to publish a review request."""

    def __str__(self):
        return 'Publish error: %s' % self


class CloseError(Exception):
    """An error that occurs while attempting to close a review request."""

    def __init__(self, message):
        super(CloseError, self).__init__(
            'Error closing the review request: %s' % message)


class ReopenError(Exception):
    """An error that occurs while attempting to reopen a review request."""

    def __init__(self, message):
        super(ReopenError, self).__init(
            'Error reopening the review request: %s' % message)


class NotModifiedError(PublishError):
    """An error that occurs when a review's state is not modified."""

    def __init__(self):
        super(NotModifiedError, self).__init__(
            'The draft has no modifications.')
