import React from "react";

import InfoCard from "./CardsLayout/InfoCard";
import ChartCard from "./CardsLayout/ChartCard";

export default class CardsLayout extends React.Component {
  render() {
    return (
      <div class="ts two cards">
        <div class="ts card">
          <InfoCard
            mapset={this.props.mapset}
            diff={this.props.diff}
            mode={this.props.mode}
          />
        </div>
        <div class="ts card">
          <ChartCard
            mapset={this.props.mapset}
            diff={this.props.diff}
            mode={this.props.mode}
            prediff={this.props.prediff}
          />
        </div>
      </div>
    );
  }
}
