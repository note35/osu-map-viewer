import React from "react";

export default class ModeButton extends React.Component {
  render() {
    const { modes } = this.props;
    return (
      <select class="ts borderless basic dropdown" onChange={this.props.search_mode_onchange}>
        {
          modes.map((val) => <option key={val} value={val}>{val}</option>)
        }
      </select>
    );
  }
}
