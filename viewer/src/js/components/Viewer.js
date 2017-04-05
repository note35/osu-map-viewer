import React from "react";

import CardsLayout from "./Viewer/CardsLayout";
import Loading from "./Viewer/Loading";

export default class Viewer extends React.Component {
  render() {
    let title = "Title of Song"; 
    if(this.props.mapset) {
       const { mapset } = this.props;
    }
    return (
      <div class="ts container">
        <div class="ts horizontal divider"></div>
        <div class="ts segment">
          <Loading
            searching={this.props.searching}
          />
          <CardsLayout
            diff={this.props.diff}
            mode={this.props.mode}
            mapset={this.props.mapset}
            previous_diff={this.props.previous_diff}
          />
        </div>
        <div class="ts fitted divider"></div>
      </div>
    );
  }
}
