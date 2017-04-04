import React from "react";
import { connect } from "react-redux";

import { fetchMapsetFromDB } from "../actions/mapsetAction";
import Footer from "./Footer";
import Header from "./Header";
import Viewer from "./Viewer";

@connect((store) => {
  return {
    mapset: store.mapset.mapset,
    mapsetFetching: store.mapset.fetching,
    mapsetFetched: store.mapset.fetched,
    mapsetError: store.mapset.error,
  };
})
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      "forced_update": false,
      "search_text": "",
      "search_mode": "Standard",
      "search_diff": "",
      "previous_diff": "",
      "searching": false,
    };
  }

  changeForcedUpdate(e) {
    if(this.state.forced_update == false) {
      this.setState({"forced_update": true,});
    }
    else if (this.state.forced_update == true) {
      this.setState({"forced_update": false,})
    }
  }

  changeSearchText(e) {
    this.setState({"search_text": e.target.value,});
  } 

  fetchMapset() {
    if(this.state.search_diff)
      this.setState({"previous_diff": this.state.search_diff});

    if(this.state.search_text.includes("https://osu.ppy.sh/s/") && this.state.search_text.indexOf("https://osu.ppy.sh/s/") == 0) {
      this.setState({"searching": true});
      this.props.dispatch(fetchMapsetFromDB(this.state.search_text, this.state.search_mode, this.state.forced_update)).then(() => {
        this.setState({"search_diff": this.getOrderDiffs(this.props.mapset)[0][0], "searching": false});
      });
    } else {
      alert("Please enter a valid url");
    }
  }

  changeSearchDiff(e) {
    this.setState({"previous_diff": this.state.search_diff});
    this.setState({"search_diff": e.target.value,});
  }

  getOrderDiffs(mapset) {
    if(mapset) {
      let diffs = [];
      let { maps } = mapset.data;
      for(let key in maps) {
        if(maps.hasOwnProperty(key)) {
          diffs.push([key, parseFloat(maps[key].star)]);
        }
      }
      diffs.sort(function(a, b) {
        return a[1]-b[1];
      });
      return diffs;
    }
  }

  getModes() {
    return ["Standard", "Taiko", "Ctb", "Mania"];
  }

  changeSearchMode(e) {
    this.setState({"search_mode": e.target.value,});
  }

  render() {
    return (
      <div>
        <Header
          forced_update_event={this.changeForcedUpdate.bind(this)}
          forced_update={this.state.forced_update}
          search_text={this.state.search_text}
          search_text_onchange={this.changeSearchText.bind(this)}
          fetch_mapset_event={this.fetchMapset.bind(this)}
          diffs={this.getOrderDiffs(this.props.mapset)} //using this.props.mapset
          search_diff_onchange={this.changeSearchDiff.bind(this)}
          modes={this.getModes()}
          search_mode_onchange={this.changeSearchMode.bind(this)}
        />
        <Viewer
          diff={this.state.search_diff}
          mode={this.state.search_mode}
          mapset={this.props.mapset}
          previous_diff={this.state.previous_diff}
          searching={this.state.searching}
        />
        <Footer />
      </div>
    );
  }
}
