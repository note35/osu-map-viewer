import React from "react";

export default class SimpleButton extends React.Component {
  render() {
    const {eventHandler, eventParam, name} = this.props;
    return (
      <button onClick={eventHandler.bind(null, eventParam)} class="ts circular button">{name}</button>
    );
  }
}
