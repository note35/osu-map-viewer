import React from "react";

export default class ForcedButton extends React.Component {
  render() {
    if(this.props.forced_update == false){
      return (
        <button onClick={this.props.forced_update_event} class="ts circular icon negative button">
          <i class="Lightning icon"></i>
        </button>
      )
    } 
    else if(this.props.forced_update == true) {
      return (
        <button onClick={this.props.forced_update_event} class="ts circular icon positive button">
          <i class="Lightning icon"></i>
        </button>
      )
    }
  }
}
