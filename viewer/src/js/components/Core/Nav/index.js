import React from "react";
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
  render() {
    return (
      <nav class="ts horizontally scrollable large borderless pure basic menu">
        <div class="ts narrow container">
          <Link to="/map">| Map</Link>
          <Link to="/user">| User</Link>
          <div class="right menu">
            <button class="ts circular large header">
              <i class="Github icon">
                <a href="https://github.com/note35/osu-map-viewer">Github</a>
              </i>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
