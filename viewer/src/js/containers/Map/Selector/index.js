import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMapsetFromDB } from "../../../actions/mapsetAction";
import { changeLoading, changeUpdate, changeText, changeMode, changeDiff, changePrediff } from "../../../actions/selectorAction";

import Selector from '../../../components/map/Selector';

class _Selector extends Component {

  changeForcedUpdate() {
    this.props.dispatch(changeUpdate(!this.props.selector.update));
  }

  changeSearchText(e) {
    this.props.dispatch(changeText(e.target.value));
  } 

  fetchMapset() {
    if(this.props.selector.diff)
      this.props.dispatch(changePrediff(this.props.selector.diff));

    if(this.props.selector.text.includes("https://osu.ppy.sh/s/") && this.props.selector.text.indexOf("https://osu.ppy.sh/s/") == 0) {
      this.props.dispatch(changeLoading(true));
      this.props.dispatch(fetchMapsetFromDB(this.props.selector.text, this.props.selector.mode, this.props.selector.update)).then(() => {
        this.props.dispatch(changeDiff(this.getOrderDiffs(this.props.mapset)[0][0]));
        this.props.dispatch(changeLoading(false));
      }).catch(() => {
        if(this.props.mapsetError) {
            this.props.dispatch(changeLoading(false));      
            alert("Beatmap is not found");
        }
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
    if(this.props.selector.text)
      this.fetchMapset();
  }

  render() {
    return (
      <Selector
          update={this.props.selector.update}
          text={this.props.selector.text}
          diffs={this.getOrderDiffs(this.props.mapset)}
          update_onoff={this.changeForcedUpdate.bind(this)}
          text_onchange={this.changeSearchText.bind(this)}
          fetch_mapset_event={this.fetchMapset.bind(this)}
          diff_onchange={this.changeSearchDiff.bind(this)}
          mode_onchange={this.changeSearchMode.bind(this)}
      />
    );
  }
}

export default connect((store) => {
  return {
    mapset: store.mapset.mapset,
    selector: store.selector,
  }
})(_Selector);
