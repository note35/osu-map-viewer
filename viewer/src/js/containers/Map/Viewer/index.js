import React, { Component } from 'react';
import { connect } from 'react-redux';

import Viewer from '../../../components/map/Viewer';

class _Viewer extends Component {
  render() {
    return (
      <Viewer
        mapset={this.props.mapset}
        diff={this.props.selector.diff}
        mode={this.props.selector.mode}
        prediff={this.props.selector.prediff}
        loading={this.props.selector.loading}
      />
    );
  }
}

export default connect((store) => {
  return {
    mapset: store.mapset.mapset,
    selector: store.selector,
  }
})(_Viewer);

