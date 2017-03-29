from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from django.http import HttpResponse
from django.http import JsonResponse

from api.views import MapSetAPI

from .models import MapSet, StandardMap, TaikoMap, CtbMap, ManiaMap 
from .map_crawler import MapCrawler

def get_mode_model(mode):
    if mode == 1:
        return TaikoMap
    elif mode == 2:
        return CtbMap
    elif mode == 3:
        return ManiaMap
    else:
        return StandardMap

def save_mapset(setid, ret):
    set_obj, set_created = MapSet.objects.update_or_create(
        setid = setid,
        defaults = {
            "title": ret["general_info"]["title"],
            "artist": ret["general_info"]["artist"],
            "url": ret["general_info"]["url"],
            "creator_url": ret["general_info"]["creator_url"],
            "creator": ret["general_info"]["creator"],
            "setid": setid,
        }
    )
    return set_obj

def save_map(ret, mapset_model, mode_model):
    for diff_id in ret["general_info"]["diffs"]:
        map_obj, map_created = mode_model.objects.update_or_create(
            mapid=diff_id,
            defaults = {
                "setid": mapset_model,
                "mapid": diff_id,
                "diff": ret[diff_id]["diff"],
                "cs": ret[diff_id]["cs"],
                "ar": ret[diff_id]["ar"],
                "od": ret[diff_id]["od"],
                "hp": ret[diff_id]["hp"],
                "star": ret[diff_id]["star"],
                "url": ret[diff_id]["url"],
                "bpm": ret[diff_id]["bpm"],
                "length": ret[diff_id]["length"]
            }
        )

def index(request, setid=None, mode=None):

    if not setid and not mode:
        setid = request.GET.get("setid") or setid
        mode = request.GET.get("mode") or mode or "0"

    if not setid:
        return HttpResponse(
            'Get mapset info: ' + request.build_absolute_uri()[0:-1] + '?setid=setid'
        )

    mc = MapCrawler()
    basic_info = mc.get_basic_info(setid)
    if not basic_info:
        return HttpResponse(
            'The beatmap you are looking for was not found!<br/>' +
            '<a href="javascript:history.back();">[Go Back]</a>'
        )
    ret = mc.get_diff_info(basic_info, mode)

    mapset_model = save_mapset(setid, ret)
    save_map(ret, mapset_model, get_mode_model(int(mode)))

    return redirect(reverse("api:index", kwargs={"setid": setid, "mode": mode}))
