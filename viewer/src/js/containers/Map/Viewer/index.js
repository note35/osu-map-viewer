import React, { Component } from 'react';
import { connect } from 'react-redux';

import Viewer from '../../../components/Map/Viewer';

const mapStateToProps = (state) => {
  return {
    mapset: state.mapset,
    selector: state.selector,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer)
