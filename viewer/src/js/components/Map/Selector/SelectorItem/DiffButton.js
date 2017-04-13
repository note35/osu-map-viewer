import React from "react";

export default class DiffButton extends React.Component {

  render() {
    const { diffs } = this.props;
    if(diffs == null) {
      return (
        <button class="ts disabled button">difficulty</button>
      )
    }
    return (
      <select class="ts borderless basic dropdown" onChange={this.props.diff_onchange}>
        {
          diffs.map((val) => <option key={val[0]} value={val[0]}>{val[0]}</option>)
        }
      </select>
    );
  }
}
