import React from "react";

import ForcedButton from "./Selector/ForcedButton";
import SearchBar from "./Selector/SearchBar";
import SearchBarUpdate from "./Selector/SearchBarUpdate";
import ModeButton from "./Selector/ModeButton";
import DiffButton from "./Selector/DiffButton";

export default class Selector extends React.Component {
  render() {
    return (
      <div class="ts basic borderless slate vertically fitted">
        <span class="description">
          <ForcedButton
            forced_update_event={this.props.forced_update_event}
            forced_update={this.props.forced_update}
          />
          <SearchBar
            search_text={this.props.search_text}
            search_text_onchange={this.props.search_text_onchange}
          />
          <SearchBarUpdate
            fetch_mapset_event={this.props.fetch_mapset_event}
          />
          <ModeButton
            search_mode_onchange={this.props.search_mode_onchange}
          />
          <DiffButton
            diffs={this.props.diffs}
            search_diff_onchange={this.props.search_diff_onchange}
          />
        </span>
      </div>
    );
  }
}
