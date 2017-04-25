import React, { Component } from 'react';
import { connect } from 'react-redux';

import Viewer from '../../../components/map/Viewer';

const mapStateToProps = (state) => {
  return {
    mapset: state.mapset.mapset,
    mode: state.selector.mode,
    diff: state.selector.diff,
    prediff: state.selector.prediff,
    loading: state.selector.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
