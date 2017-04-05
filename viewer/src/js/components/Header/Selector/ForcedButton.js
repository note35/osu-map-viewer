import React from "react";

export default class ForcedButton extends React.Component {
  render() {
    let button_class = "ts circular icon negative button";
    if(this.props.update){
      button_class = "ts circular icon positive button";
    }
    return (
      <button onClick={this.props.update_onoff} class={button_class}>
        <i class="Lightning icon"></i>
      </button>
    )
  }
}
