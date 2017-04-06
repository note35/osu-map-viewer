from django.db import models

class MapSet(models.Model):
    title = models.CharField(u'title', max_length=256)
    artist = models.CharField(u'artist', max_length=256)
    url = models.CharField(u'url', max_length=256)
    creator_url = models.CharField(u'creator_url', max_length=256)
    creator = models.CharField(u'creator', max_length=256)
    setid = models.CharField(u'setid', max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.setid


class StandardMap(models.Model):
    setid = models.ForeignKey(MapSet, related_name="std_maps")
    mapid = models.CharField(u'mapid', max_length=256)
    diff = models.CharField(u'name', max_length=256)
    cs = models.CharField(u'cs', max_length=8)
    ar = models.CharField(u'ar', max_length=8)
    od = models.CharField(u'od', max_length=8)
    hp = models.CharField(u'hp', max_length=8)
    star = models.CharField(u'star', max_length=8)
    url = models.CharField(u'cs', max_length=256)
    bpm = models.CharField(u'bpm', max_length=8)
    length = models.CharField(u'length', max_length=32)

    def __str__(self):
        return self.mapid


class TaikoMap(models.Model):
    setid = models.ForeignKey(MapSet, related_name="taiko_maps")
    mapid = models.CharField(u'mapid', max_length=256)
    diff = models.CharField(u'name', max_length=256)
    cs = models.CharField(u'cs', max_length=8)
    ar = models.CharField(u'ar', max_length=8)
    od = models.CharField(u'od', max_length=8)
    hp = models.CharField(u'hp', max_length=8)
    star = models.CharField(u'star', max_length=8)
    url = models.CharField(u'cs', max_length=256)
    bpm = models.CharField(u'bpm', max_length=8)
    length = models.CharField(u'length', max_length=32)

    def __str__(self):
        return self.mapid


class CtbMap(models.Model):
    setid = models.ForeignKey(MapSet, related_name="ctb_maps")
    mapid = models.CharField(u'mapid', max_length=256)
    diff = models.CharField(u'name', max_length=256)
    cs = models.CharField(u'cs', max_length=8)
    ar = models.CharField(u'ar', max_length=8)
    od = models.CharField(u'od', max_length=8)
    hp = models.CharField(u'hp', max_length=8)
    star = models.CharField(u'star', max_length=8)
    url = models.CharField(u'cs', max_length=256)
    bpm = models.CharField(u'bpm', max_length=8)
    length = models.CharField(u'length', max_length=32)

    def __str__(self):
        return self.mapid


class ManiaMap(models.Model):
    setid = models.ForeignKey(MapSet, related_name="mania_maps")
    mapid = models.CharField(u'mapid', max_length=256)
    set_id = models.ForeignKey(MapSet, blank=True, null=True)
    map_id = models.CharField(u'did', max_length=256)
    diff = models.CharField(u'name', max_length=256)
    cs = models.CharField(u'cs', max_length=8)
    ar = models.CharField(u'ar', max_length=8)
    od = models.CharField(u'od', max_length=8)
    hp = models.CharField(u'hp', max_length=8)
    star = models.CharField(u'star', max_length=8)
    url = models.CharField(u'cs', max_length=256)
    bpm = models.CharField(u'bpm', max_length=8)
    length = models.CharField(u'length', max_length=32)

    def __str__(self):
        return self.mapid
