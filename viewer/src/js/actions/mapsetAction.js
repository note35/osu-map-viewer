import axios from "axios";

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
    query_url = "http://127.0.0.1:8000/api/"+setid+"/"+mode+"/1?format=json";
  else
    query_url = "http://127.0.0.1:8000/api/"+setid+"/"+mode+"?format=json";

  return {
    type: "FETCHDB",
    payload: axios.get(query_url),
  }
}
