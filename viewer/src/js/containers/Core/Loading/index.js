import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../../components/core/Loading';

class _Loading extends Component {
  render() {
    return (
      <Loading
        loading={this.props.selector.loading}
      />
    );
  }
}

export default connect((store) => {
    selector: store.selector,
})(_Loading);
