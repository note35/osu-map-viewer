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
  /*
  Todo: because cors can not be handled by redirect, the backend API need to be modified.
  if(force)
    query_url = "http://127.0.0.1:8000/crawler?setid="+setid+"&mode="+mode;
  else
  */
    query_url = "http://127.0.0.1:8000/api/"+setid+"/"+mode+"?format=json";

  return {
    type: "FETCHDB",
    payload: axios.get(query_url),
  }
}
