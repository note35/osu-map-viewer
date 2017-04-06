from django.db import models


class User(models.Model):
    uid = models.CharField(u'mapid', max_length=256)
    name = models.CharField(u'mapid', max_length=256) 
    avatar = models.CharField(u'mapid', max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.uid


class PPoint(models.Model):
    uid = models.ForeignKey(User, related_name="pp")
    osu_pp = models.CharField(u'cs', max_length=8)
    osu_rank = models.CharField(u'cs', max_length=20)
    osu_bonus_pp = models.CharField(u'cs', max_length=3)
    taiko_pp = models.CharField(u'cs', max_length=8)
    taiko_rank = models.CharField(u'cs', max_length=20)
    taiko_bonus_pp = models.CharField(u'cs', max_length=3)
    ctb_pp = models.CharField(u'cs', max_length=8)
    ctb_rank = models.CharField(u'cs', max_length=20)
    ctb_bonus_pp = models.CharField(u'cs', max_length=3)
    mania_pp = models.CharField(u'cs', max_length=8)
    mania_rank = models.CharField(u'cs', max_length=20)
    mania_bonus_pp = models.CharField(u'cs', max_length=3)

    def __str__(self):
        return self.uid
