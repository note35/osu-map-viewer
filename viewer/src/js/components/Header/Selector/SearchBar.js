import React from "react";

export default class SearchBar extends React.Component {
  render() {
    return (
      <div class="ts focus input">
        <input type="text"
          onChange={this.props.search_text_onchange}
          placeholder="https://osu.ppy.sh/s/1"
        />
      </div>
    );
  }
}
