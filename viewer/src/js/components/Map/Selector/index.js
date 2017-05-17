import React from "react";

import ForcedButton from "./SelectorItem/ForcedButton";
import SearchBar from "./SelectorItem/SearchBar";
import SimpleButton from "./SelectorItem/SimpleButton";
import SelectButton from "./SelectorItem/SelectButton";

export default class Selector extends React.Component {
  render() {
    return (
      <div class="ts basic borderless slate vertically fitted">
        <span class="description">
          <ForcedButton
            update={this.props.selector.update}
            update_onoff={this.props.update_onoff}
          />
          <SearchBar
            text={this.props.selector.text}
            text_onchange={this.props.text_onchange}
          />
          <SimpleButton
            eventHandler={this.props.fetch_mapset_event}
            eventParam={this.props.selector}
            name={"update"}
          />
          <SelectButton
            eventHandler={this.props.mode_onchange}
            eventParam={this.props.selector}
            options={["Standard", "Taiko", "Ctb", "Mania"]}
            name={"mode"}
          />
          <SelectButton
            eventHandler={this.props.diff_onchange}
            eventParam={this.props.selector}
            options={this.props.diffs}
            name={"difficulty"}
          />
        </span>
      </div>
    );
  }
}
