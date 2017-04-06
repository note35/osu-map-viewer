import requests
import re
import time
from bs4 import BeautifulSoup

class MapCrawler(object):

    def __init__(self):
        # prepare query information
        self.base_url = "https://osu.ppy.sh"
        self.mapset = "/s/"

    def __get_value(self, info, attr):
        BASE_WIDTH = 140
        try:
            if attr == "Star Difficulty":
                attr_pos = info.find(['td', 'strong'], text=re.compile(attr)).find_next()
                return re.findall(r"\d+\.\d+", attr_pos.contents[1])[0]
            else:
                attr_pos = info.find('td', text=re.compile(attr)).find_next()
            attr_width = attr_pos.find("div", {"class": "active"})["style"]
            attr_value = int(re.findall(r"\d+", attr_width)[0])
            attr_value_post = round(attr_value*10/BASE_WIDTH, 2)
            return attr_value_post
        except:
            return 0

    def get_basic_info(self, map_id):

        # request map info
        url = self.base_url + self.mapset + map_id
        query_map = requests.get(url).text

        if "The beatmap you are looking for was not found!" in query_map:
            return None

        # get all diffs link
        soup = BeautifulSoup(query_map, "lxml")
        diffs = soup.find("div", {"id": "tablist"})
        diff_links = diffs.find_all("a", {"class": "beatmapTab"})

        # prepare return data
        ret = {}

        diff_list = []
        for diff in diff_links:
            diff_name = diff.find("span").contents[0]
            diff_id = re.findall(r"\d+", diff["href"])[0]
            ret[diff_name] = {
                "url": self.base_url+diff["href"],
                "diff_id": diff_id,
            }
            diff_list.append(diff_id)

        # general info
        general_info = soup.find("table", {"id": "songinfo"})
        try:
            title = general_info.find("td", text=re.compile("Title")).find_next().find_next().contents[0]
        except:
            title = ""
        try:
            artist = general_info.find("td", text=re.compile("Artist")).find_next().find_next().contents[0]
        except:
            artist = ""
        try:
            creator = general_info.find("td", text=re.compile("Creator")).find_next().find_next().contents[0]
        except:
            creator = ""
        try:
            creator_url = self.base_url + general_info.find("td", text=re.compile("Creator")).find_next().contents[0]["href"]
        except:
            creator_url = ""
        info = {
            "title": title,
            "artist": artist,
            "creator": creator,
            "creator_url": creator_url,
            "url": url,
            "diffs": diff_list,
            "setid": map_id,
        }
        ret["general_info"] = info

        return ret

    def get_diff_info(self, map_dict, mode):

        diff_infos = {
            "general_info": map_dict["general_info"]
        }

        for key, item in map_dict.items():
            if key == "general_info":
                continue

            # request map info
            url = item["url"][:-1] + mode
            query_map = requests.get(url).text
            soup = BeautifulSoup(query_map, "lxml")
            info = soup.find("table", {"id": "songinfo"})
            try:
                bpm = info.find("td", text=re.compile("BPM")).find_next().contents[0]
            except:
                bpm = "0"
            try:
                length = info.find("td", text=re.compile("Length")).find_next().contents[0]
            except:
                length = ""
            diff_info = {
                "diff": key,
                "cs": self.__get_value(info, "Circle Size"),
                "ar": self.__get_value(info, "Approach Rate"),
                "od": self.__get_value(info, "Accuracy"),
                "hp": self.__get_value(info, "HP Drain"),
                "star": self.__get_value(info, "Star Difficulty"),
                "url": url,
                "bpm": bpm,
                "length": length,
            }
            diff_infos[item["diff_id"]] = diff_info;
            time.sleep(0.5)

        return diff_infos
