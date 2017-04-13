import React from "react";

import Nav from "./Header/Nav";
import Selector from "./Header/Selector";

export default class Header extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <Selector
          update_onoff={this.props.update_onoff}
          update={this.props.update}
          text={this.props.text}
          text_onchange={this.props.text_onchange}
          fetch_mapset_event={this.props.fetch_mapset_event}
          diffs={this.props.diffs}
          diff_onchange={this.props.diff_onchange}
          mode_onchange={this.props.mode_onchange}
        />
      </div>
    );
  }
}
