import React from "react";

import OnOffButton from "./SelectorItem/OnOffButton";
import SimpleTextInput from "./SelectorItem/SimpleTextInput";
import SimpleButton from "./SelectorItem/SimpleButton";
import SelectButton from "./SelectorItem/SelectButton";

export default class Selector extends React.Component {
  render() {
    return (
      <div class="ts basic borderless slate vertically fitted">
        <span class="description">
          <OnOffButton
            curState={this.props.selector.update}
            eventHandler={this.props.updateOnOff}
          />
          <SimpleTextInput
            eventHandler={this.props.textOnChange}
            defaultText={"https://osu.ppy.sh/s/1"}
          />
          <SimpleButton
            eventHandler={this.props.fetchMapsetEvent}
            eventParam={this.props.selector}
            name={"update"}
          />
          <SelectButton
            eventHandler={this.props.modeOnChange}
            eventParam={this.props.selector}
            options={["Standard", "Taiko", "Ctb", "Mania"]}
            name={"mode"}
          />
          <SelectButton
            eventHandler={this.props.diffOnChange}
            eventParam={this.props.selector}
            options={this.props.diffs}
            name={"difficulty"}
          />
        </span>
      </div>
    );
  }
}
