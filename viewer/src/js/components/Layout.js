import React from "react";
import { connect } from "react-redux";

import { fetchMapsetFromDB } from "../actions/mapsetAction";
import { changeLoadingStat, changeUpdate, changeNotUpdate, changeText, changeMode, changeDiff, changePrediff } from "../actions/selectorAction";
import Footer from "./Footer";
import Header from "./Header";
import Viewer from "./Viewer";

@connect((store) => {
  return {
    mapset: store.mapset.mapset,
    mapsetFetching: store.mapset.fetching,
    mapsetFetched: store.mapset.fetched,
    mapsetError: store.mapset.error,
    selector: store.selector,
  };
})
export default class Layout extends React.Component {
  constructor() {
    super();
  }

  changeForcedUpdate(e) {
    if(this.props.selector.update == false) {
      this.props.dispatch(changeUpdate());
    } else if(this.props.selector.update == true) {
      this.props.dispatch(changeNotUpdate());
    }
  }

  changeSearchText(e) {
    this.props.dispatch(changeText(e.target.value));
  } 

  fetchMapset() {
    if(this.props.selector.diff)
      this.props.dispatch(changePrediff(this.props.selector.diff));

    if(this.props.selector.text.includes("https://osu.ppy.sh/s/") && this.props.selector.text.indexOf("https://osu.ppy.sh/s/") == 0) {
      this.props.dispatch(changeLoadingStat(true));
      this.props.dispatch(fetchMapsetFromDB(this.props.selector.text, this.props.selector.mode, this.props.selector.update)).then(() => {
        this.props.dispatch(changeDiff(this.getOrderDiffs(this.props.mapset)[0][0]));
        this.props.dispatch(changeLoadingStat(false));
      });
    } else {
      alert("Please enter a valid url");
    }
  }

  changeSearchDiff(e) {
    this.props.dispatch(changePrediff(this.props.selector.diff));
    this.props.dispatch(changeDiff(e.target.value));
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

  changeSearchMode(e) {
    this.props.dispatch(changeMode(e.target.value));
  }

  render() {
    return (
      <div>
        <Header
          forced_update_event={this.changeForcedUpdate.bind(this)}
          forced_update={this.props.selector.update}
          search_text={this.props.selector.text}
          search_text_onchange={this.changeSearchText.bind(this)}
          fetch_mapset_event={this.fetchMapset.bind(this)}
          diffs={this.getOrderDiffs(this.props.mapset)} //using this.props.mapset
          search_diff_onchange={this.changeSearchDiff.bind(this)}
          search_mode_onchange={this.changeSearchMode.bind(this)}
        />
        <Viewer
          diff={this.props.selector.diff}
          mode={this.props.selector.mode}
          mapset={this.props.mapset}
          previous_diff={this.props.selector.prediff}
          searching={this.props.selector.loading}
        />
        <Footer />
      </div>
    );
  }
}
