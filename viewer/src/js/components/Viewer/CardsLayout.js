import React from "react";

import InfoCard from "./CardsLayout/InfoCard";
import ChartCard from "./CardsLayout/ChartCard";

export default class CardsLayout extends React.Component {
  render() {
    return (
      <div class="ts two cards">
        <div class="ts card">
          <InfoCard
            diff={this.props.diff}
            mode={this.props.mode}
            mapset={this.props.mapset}
          />
        </div>
        <div class="ts card">
          <ChartCard
            diff={this.props.diff}
            mode={this.props.mode}
            mapset={this.props.mapset}
            previous_diff={this.props.previous_diff}
          />
        </div>
      </div>
    );
  }
}
