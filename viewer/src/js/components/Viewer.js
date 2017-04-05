import React from "react";

import CardsLayout from "./Viewer/CardsLayout";
import Loading from "./Viewer/Loading";

export default class Viewer extends React.Component {
  render() {
    return (
      <div class="ts container">
        <div class="ts horizontal divider"></div>
        <div class="ts segment">
          <Loading
            loading={this.props.loading}
          />
          <CardsLayout
            mapset={this.props.mapset}
            diff={this.props.diff}
            mode={this.props.mode}
            prediff={this.props.prediff}
          />
        </div>
        <div class="ts fitted divider"></div>
      </div>
    );
  }
}
