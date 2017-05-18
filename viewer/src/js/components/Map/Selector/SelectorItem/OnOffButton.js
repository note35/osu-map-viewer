import React from "react";

export default class OnOffButton extends React.Component {
  render() {
    const {curState, eventHandler} = this.props;
    let button_class = "ts circular icon negative button";
    if(curState){
      button_class = "ts circular icon positive button";
    }
    return (
      <button onClick={eventHandler.bind(null, curState)} class={button_class}>
        <i class="Lightning icon"></i>
      </button>
    )
  }
}
