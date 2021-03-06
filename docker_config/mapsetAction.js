import axios from "axios";
import * as t from '../actionTypes';

export function fetchMapsetFromDB(url, mode, force) {

  let setid = url.substring(21)

  if(mode == "Standard")
    mode = 0;
  else if(mode == "Taiko")
    mode = 1;
  else if(mode == "Ctb")
    mode = 2;
  else if(mode == "Mania")
    mode = 3;

  let query_url = ""

  if(force)
    query_url = "http://192.168.99.100:8000/api/map/"+setid+"/"+mode+"/1?format=json";
  else
    query_url = "http://192.168.99.100:8000/api/map/"+setid+"/"+mode+"?format=json";

  return {
    type: t.FETCHDB,
    payload: axios.get(query_url),
  }
}
