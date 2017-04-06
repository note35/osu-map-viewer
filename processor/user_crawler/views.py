from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from .models import User, PPoint
from .user_crawler import UserCrawler

def save_user(info):
    try:
        uid = info["uid"]
    except KeyError:
        uid = None
    user_obj, user_created = User.objects.update_or_create(
        uid = uid,
        defaults = {
            "name": info["name"],
            "uid": info["uid"],
            "avatar": info["avatar"],
        }
    )

    def retrieve_mode_info(info):
        for i in range(0, 4):
            yield {
                "pp": info["pp"][i],
                "rank": info["rank"][i],
                "bonus": info["bonus_pp"][i]
            }
    gen = retrieve_mode_info(info)

    pp_obj, pp_created = PPoint.objects.update_or_create(
        uid = user_obj,
        defaults = {
            "uid": user_obj,
            "osu_pp": info["pp"][0],
            "osu_rank": info["rank"][0],
            "osu_bonus_pp": info["bonus_pp"][0],
            "taiko_pp": info["pp"][1],
            "taiko_rank": info["rank"][1],
            "taiko_bonus_pp": info["bonus_pp"][1],
            "ctb_pp": info["pp"][2],
            "ctb_rank": info["rank"][2],
            "ctb_bonus_pp": info["bonus_pp"][2],
            "mania_pp": info["pp"][3],
            "mania_rank": info["rank"][3],
            "mania_bonus_pp": info["bonus_pp"][3],
        }
    )

def index(request, name=None):

    if not name:
        name = request.GET.get("name") or name

    if not name:
        return redirect(reverse("api:error404"));

    mc = UserCrawler()

    user_info = mc.get_user_by_name(name)

    if not user_info:
        return redirect(reverse("api:error404"));

    save_user(user_info)

    return redirect(reverse("api:user", kwargs={"name": name}))
