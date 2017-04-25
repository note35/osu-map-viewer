import React from "react";

export default class ModeButton extends React.Component {
  render() {
    const { diff, text, mode, update } = this.props;
    const modes = ["Standard", "Taiko", "Ctb", "Mania"];
    return (
      <select class="ts borderless basic dropdown" onChange={this.props.mode_onchange.bind(null, diff, text, mode, update)}>
        {
          modes.map((val) => <option key={val} value={val}>{val}</option>)
        }
      </select>
    );
  }
}
