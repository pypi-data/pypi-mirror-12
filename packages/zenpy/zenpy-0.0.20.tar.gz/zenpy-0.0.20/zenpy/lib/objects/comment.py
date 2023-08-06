from zenpy.lib.objects.base_object import BaseObject


class Comment(BaseObject):
    def __init__(self, api=None, **kwargs):
        self.api = api
        self.body = None
        self._via = None
        self.attachments = None
        self.created_at = None
        self.public = None
        self.author_id = None
        self.type = None
        self.id = None
        self._metadata = None

        for key, value in kwargs.iteritems():
            setattr(self, key, value)

    @property
    def via(self):
        if self.api and self._via:
            return self.api.get_via(self._via)

    @via.setter
    def via(self, via):
        if via:
            self._via = via

    @property
    def author(self):
        if self.api and self.author_id:
            return self.api.get_user(self.author_id)

    @author.setter
    def author(self, author):
        if author:
            self.author_id = author.id

    @property
    def metadata(self):
        if self.api and self._metadata:
            return self.api.get_metadata(self._metadata)

    @metadata.setter
    def metadata(self, metadata):
        if metadata:
            self._metadata = metadata
