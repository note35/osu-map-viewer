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

const fetchMapset = (diff, text, mode, update, dispatch) => {
  if(diff)
    dispatch(changePrediff(diff));

  if(text.includes("https://osu.ppy.sh/s/") && text.indexOf("https://osu.ppy.sh/s/") == 0) {
    dispatch(changeLoading(true));
    dispatch(fetchMapsetFromDB(text, mode, update)).then((response) => {
      dispatch(changeLoading(false));
      dispatch(changeDiff(getOrderDiffs(response.value)[0][0]));
    }).catch((error) => {
      dispatch(changeLoading(false));      
      alert("Beatmap is not found");
    })
  } else {
    alert("Please enter a valid url");
  }
}

const changeSearchDiff = (diff, e, dispatch) => {
  dispatch(changePrediff(diff));
  dispatch(changeDiff(e.target.value));
}

const getOrderDiffs = (mapset) => {
  if(mapset) {
    let diffs = [];
    let { maps } = mapset.data;
    for(let key in maps) {
      if(maps.hasOwnProperty(key)) {
        diffs.push([key, parseFloat(maps[key].star)]);
      }
    }
    diffs.sort((a, b) => a[1]-b[1]);
    return diffs;
  }
}

const changeSearchMode = (diff, text, mode, update, e, dispatch) => {
  dispatch(changeMode(e.target.value));
  if(text)
    fetchMapset(diff, text, mode, update, dispatch);
}

const mapStateToProps = (state) => {
  return {
    mapset: state.mapset.mapset,
    mapsetError: state.mapset.error,
    update: state.selector.update,
    text: state.selector.text,
    mode: state.selector.mode,
    diffs: getOrderDiffs(state.mapset.mapset),
    diff: state.selector.diff,
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
    diff_onchange: (diff, e) => {
      changeSearchDiff(diff, e, dispatch);
    },
    mode_onchange: (diff, text, mode, update, e) => {
      changeSearchMode(diff, text, mode, update, e, dispatch);
    },
    fetch_mapset_event: (diff, text, mode, update) => {
      fetchMapset(diff, text, mode, update, dispatch);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector)
