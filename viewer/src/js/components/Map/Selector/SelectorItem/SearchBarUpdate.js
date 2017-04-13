import React from "react";

export default class SearchBarUpdate extends React.Component {
  render() {
    return (
      <button onClick={this.props.fetch_mapset_event} class="ts circular button">update</button>
    );
  }
}
