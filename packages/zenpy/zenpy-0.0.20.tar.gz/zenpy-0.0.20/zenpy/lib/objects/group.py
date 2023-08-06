from zenpy.lib.objects.base_object import BaseObject


class Group(BaseObject):
    def __init__(self, api=None, **kwargs):
        self.api = api
        self.name = None
        self.url = None
        self.created_at = None
        self.updated_at = None
        self.deleted = None
        self.id = None

        for key, value in kwargs.iteritems():
            setattr(self, key, value)
