import requests
import re
import time
from bs4 import BeautifulSoup

class UserCrawler(object):

    def __init__(self):
        # prepare query information
        self.base_url = "https://osu.ppy.sh"
        self.username = "/u/"
        self.HIDEPP = 44

    def get_user_by_name(self, name):

        # request map info
        url = self.base_url + self.username + name
        query_user = requests.get(url).text

        if "The user you are looking for was not found!" in query_user:
            return {}

        # get all diffs link
        soup = BeautifulSoup(query_user, "lxml")

        try:
            avatar = "https:" + soup.find("img", {"alt": "User avatar"})["src"]
            regex = re.compile("(//a.ppy.sh/(\d+)_(\d+))") #'//a.ppy.sh/50265_1482610392.png'
            ret = regex.search(avatar) #('//a.ppy.sh/50265_1482610392', '50265', '1482610392')
            uid = ret.groups()[1] 
        except:
            avatar = ""
            uid = ""

        pp, rank, bonus_pp = self.__get_pp_rank(uid)

        # prepare return data
        ret = {
            "name": name,
            "uid": uid,
            "avatar": avatar,
            "pp": pp,
            "rank": rank,
            "bonus_pp": bonus_pp,
        }

        return ret

    def __get_pp_rank(self, uid):
        pp = [-1, -1, -1, -1]
        rank = [-1, -1, -1, -1]
        bonus_pp = [-1, -1, -1, -1]
        if uid:
            url = self.base_url + "/pages/include/profile-general.php?u=" + uid + "&m="
            for mode in range(0, 4):
                query_page = requests.get(url + str(mode)).text
                if "No information recorded" not in query_page or "This user has not played enough" not in query_page:
                    soup = BeautifulSoup(query_page, "lxml")
                    # ": 12,421pp (#5)
                    try:
                        tmp = soup.find("div", {"class": "profileStatLine"}).find("b").contents[1].split(" ")

                        ret = re.compile("(([\d,]+)pp)").search(tmp[1]) # 12,421pp
                        pp[mode] = int(ret.groups()[1].replace(",", ""))
                        ret = re.compile("(\(#([\d,]+)\))").search(tmp[2]) # (#13,951)
                        rank[mode] = int(ret.groups()[1].replace(",", ""))

                        bonus_pp_tmp = pp[mode] - self.__get_bonus_pp(uid, mode) - self.HIDEPP
                        if bonus_pp_tmp < 0:
                            bonus_pp[mode] = 0
                        else:
                            bonus_pp[mode] = bonus_pp_tmp
                    except:
                        pass
        return pp, rank, bonus_pp

    def __get_bonus_pp(self, uid, mode):
        score = 0
        for page in range(0, 2):
            url = "https://osu.ppy.sh/pages/include/profile-leader.php?u="+uid+"&m="+str(mode)+"&pp="+str(page)
            query_page = requests.get(url).text
            soup = BeautifulSoup(query_page, "lxml")
            for item in soup.select(".pp-display-weight"):
                try:
                    score += int(re.findall(r"\d+", item.text.split(" ")[2])[0])
                except:
                    pass
        return score
        
#uc = UserCrawler()
#print(uc.get_user_by_name("hvick225"));
