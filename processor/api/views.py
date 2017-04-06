from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponseNotFound

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from map_crawler.models import MapSet, StandardMap, TaikoMap, CtbMap, ManiaMap 
from user_crawler.models import User, PPoint 

def get_mode_model(mode):
    if mode == 1:
        return TaikoMap
    elif mode == 2:
        return CtbMap
    elif mode == 3:
        return ManiaMap
    else:
        return StandardMap

def retrieve_map(setid, mode):
    mode_model = get_mode_model(int(mode))
    try:
        mmaps = mode_model.objects.all().filter(setid=setid)
        ret = {}
        for mmap in mmaps:
            ret[mmap.diff] = {
                "mapid": mmap.mapid,
                "diff": mmap.diff,
                "cs": mmap.cs,
                "ar": mmap.ar,
                "od": mmap.od,
                "hp": mmap.hp,
                "star": mmap.star,
                "url": mmap.url,
                "bpm": mmap.bpm,
                "length": mmap.length,
            }
        return ret
    except:
        return {}

def retrieve_mapset(setid, mode):

    try:
        mapset = MapSet.objects.get(setid=setid)
        general_info = {
            "title": mapset.title,
            "artist": mapset.artist,
            "url": mapset.url,
            "creator_url": mapset.creator_url,
            "creator": mapset.creator,
            "setid": mapset.setid,
            "created_at": mapset.created_at,
            "updated_at": mapset.updated_at,
        }
        ret = {
            "general_info": general_info,
            "maps": retrieve_map(mapset.id, mode)
        }
        return ret

    except MapSet.DoesNotExist:
        return {}


def retrieve_user_by_name(name):

    try:
        user = User.objects.get(name=name)
        ppoint = PPoint.objects.get(uid=user)
        ret = {
            "name": user.name,
            "uid": user.uid,
            "avatar": user.avatar,
            "Standard": {
                "pp": ppoint.osu_pp,
                "rank": ppoint.osu_rank,
                "bonus_pp": ppoint.osu_bonus_pp,
            },
            "Taiko": {
                "pp": ppoint.taiko_pp,
                "rank": ppoint.taiko_rank,
                "bonus_pp": ppoint.taiko_bonus_pp,
            },
            "Ctb": {
                "pp": ppoint.ctb_pp,
                "rank": ppoint.ctb_rank,
                "bonus_pp": ppoint.ctb_bonus_pp,
            },
            "Mania": {
                "pp": ppoint.mania_pp,
                "rank": ppoint.mania_rank,
                "bonus_pp": ppoint.mania_bonus_pp,
            },
        }
        return ret
    except User.DoesNotExist:
        return {}
    except PPoint.DoesNotExist:
        return {}

    return {}

class MapSetAPI(APIView):

    def get(self, request, setid, mode, update=False):
        mapset = retrieve_mapset(setid, mode)

        if update or not mapset or not mapset["maps"]:
            return redirect(reverse("map_crawler:index", kwargs={"setid": setid, "mode": mode}))
        return Response(mapset)

class UserAPI(APIView):

    def get(self, request, name, update=False):
        user = retrieve_user_by_name(name)

        if update or not user:
            return redirect(reverse("user_crawler:index", kwargs={"name": name}))
        return Response(user)

def handle404(request):
    return HttpResponseNotFound('Beatmap not found.')
