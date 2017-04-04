import React from "react";

export default class Loading extends React.Component {

  render() {
    if(this.props.searching) {
      return (
        <div class="ts active inverted dimmer">
          <div class="ts text loader">Loading...</div>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}
