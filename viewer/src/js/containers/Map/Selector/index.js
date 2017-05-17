import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMapsetFromDB } from "../../../actions/mapsetAction";
import { changeLoading, changeUpdate, changeText, changeMode, changeDiff, changePrediff } from "../../../actions/selectorAction";

import Selector from '../../../components/map/Selector';

const changeForcedUpdate = (update, dispatch) => {
  dispatch(changeUpdate(!update));
};

const changeSearchText = (e, dispatch) => {
  dispatch(changeText(e.target.value));
};

const fetchMapset = (selector, dispatch) => {
  const {diff, text, mode, update} = selector;

  if(diff)
    dispatch(changePrediff(diff));

  if(text.includes("https://osu.ppy.sh/s/") && text.indexOf("https://osu.ppy.sh/s/") == 0) {
    dispatch(changeLoading(true));
    dispatch(fetchMapsetFromDB(text, mode, update)).then((response) => {
      dispatch(changeLoading(false));
      dispatch(changeDiff(getOrderDiffs(response.value)[0]));
    }).catch((error) => {
      dispatch(changeLoading(false));      
      alert("Beatmap is not found");
    })
  } else {
    alert("Please enter a valid url");
  }
}

const changeSearchDiff = (selector, e, dispatch) => {
  const {diff} = selector;
  dispatch(changePrediff(diff));
  dispatch(changeDiff(e.target.value));
}

const getOrderDiffs = (mapset) => {
  console.log(mapset)
  if(mapset) {
    let diffs = [];
    let { maps } = mapset.data;
    for(let key in maps) {
      if(maps.hasOwnProperty(key)) {
        diffs.push([key]);//, parseFloat(maps[key].star)]);
      }
    }
    diffs.sort((a, b) => a[1]-b[1]);
    console.log(diffs)
    return diffs;
  }
}

const changeSearchMode = (selector, e, dispatch) => {
  const {text} = selector;
  dispatch(changeMode(e.target.value));
  if(text)
    fetchMapset(selector, dispatch);
}

const mapStateToProps = (state) => {
  return {
    mapset: state.mapset,
    selector: state.selector,
    diffs: getOrderDiffs(state.mapset.mapset),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update_onoff: (update) => {
      changeForcedUpdate(update, dispatch);
    },
    text_onchange: (e) => {
      changeSearchText(e, dispatch);
    },
    diff_onchange: (selector, e) => {
      changeSearchDiff(selector, e, dispatch);
    },
    mode_onchange: (selector, e) => {
      changeSearchMode(selector, e, dispatch);
    },
    fetch_mapset_event: (selector) => {
      fetchMapset(selector, dispatch);
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector)
