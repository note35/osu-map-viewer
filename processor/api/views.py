from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.http import HttpResponseNotFound

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from map_crawler.models import MapSet, StandardMap, TaikoMap, CtbMap, ManiaMap 

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


class MapSetAPI(APIView):

    def get(self, request, setid, mode, update=False):
        mapset = retrieve_mapset(setid, mode)

        if update or not mapset or not mapset["maps"]:
            return redirect(reverse("map_crawler:index", kwargs={"setid": setid, "mode": mode}))
        return Response(mapset)

def handle404(request):
    return HttpResponseNotFound('Beatmap not found.')
