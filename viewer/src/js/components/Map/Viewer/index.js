import React from "react";

import CardsLayout from "./CardsLayout";
import Loading from "../../Core/Loading";

export default class Viewer extends React.Component {
  render() {
    const {mapset} = this.props.mapset;
    const {diff, mode, prediff, loading} = this.props.selector;

    return (
      <div class="ts container">
        <div class="ts horizontal divider"></div>
        <div class="ts segment">
          <Loading
            loading={loading}
          />
          <CardsLayout
            mapset={mapset}
            diff={diff}
            mode={mode}
            prediff={prediff}
          />
        </div>
        <div class="ts fitted divider"></div>
      </div>
    );
  }
}
