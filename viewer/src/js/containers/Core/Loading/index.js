import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../../components/Core/Loading';

const mapStateToProps = (state) => {
  return {
    loading: state.selector.loading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
