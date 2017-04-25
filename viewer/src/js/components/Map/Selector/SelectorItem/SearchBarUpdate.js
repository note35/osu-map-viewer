import React from "react";

export default class SearchBarUpdate extends React.Component {
  render() {
    const { fetch_mapset_event, diff, text, mode, update } = this.props;
    return (
      <button onClick={fetch_mapset_event.bind(null, diff, text, mode, update)} class="ts circular button">update</button>
    );
  }
}
