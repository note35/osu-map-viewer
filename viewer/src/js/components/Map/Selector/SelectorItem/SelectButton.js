import React from "react";

export default class SelectButton extends React.Component {

  render() {
    const { eventHandler, eventParam, options, name } = this.props;
    const id = name+"_btn";

    if(options == null) {
      return (
        <button id={id} class="ts disabled button">
          {name}
        </button>
      )
    }
    return (
      <select id={id} class="ts borderless basic dropdown" onChange={eventHandler.bind(null, eventParam)}>
        {options.map((val) => <option key={val} value={val}>{val}</option>)}
      </select>
    );
  }
}
