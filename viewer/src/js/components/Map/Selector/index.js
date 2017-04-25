import React from "react";

import ForcedButton from "./SelectorItem/ForcedButton";
import SearchBar from "./SelectorItem/SearchBar";
import SearchBarUpdate from "./SelectorItem/SearchBarUpdate";
import ModeButton from "./SelectorItem/ModeButton";
import DiffButton from "./SelectorItem/DiffButton";

export default class Selector extends React.Component {
  render() {
    return (
      <div class="ts basic borderless slate vertically fitted">
        <span class="description">
          <ForcedButton
            update_onoff={this.props.update_onoff}
            update={this.props.update}
          />
          <SearchBar
            text={this.props.text}
            text_onchange={this.props.text_onchange}
          />
          <SearchBarUpdate
            diff={this.props.diff}
            text={this.props.text}
            mode={this.props.mode}
            update={this.props.update}
            fetch_mapset_event={this.props.fetch_mapset_event}
          />
          <ModeButton
            diff={this.props.diff}
            text={this.props.text}
            mode={this.props.mode}
            update={this.props.update}
            mode_onchange={this.props.mode_onchange}
          />
          <DiffButton
            diff={this.props.diff}
            diffs={this.props.diffs}
            diff_onchange={this.props.diff_onchange}
          />
        </span>
      </div>
    );
  }
}
