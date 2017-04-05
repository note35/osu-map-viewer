import React from "react";

import Nav from "./Header/Nav";
import Selector from "./Header/Selector";

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <Selector
          forced_update_event={this.props.forced_update_event}
          forced_update={this.props.forced_update}
          search_text={this.props.search_text}
          search_text_onchange={this.props.search_text_onchange}
          fetch_mapset_event={this.props.fetch_mapset_event}
          diffs={this.props.diffs}
          search_diff_onchange={this.props.search_diff_onchange}
          search_mode_onchange={this.props.search_mode_onchange}
        />
      </div>
    );
  }
}
