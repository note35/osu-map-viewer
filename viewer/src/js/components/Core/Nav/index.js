import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
      <nav class="ts horizontally scrollable large borderless pure basic menu">
        <div class="ts narrow container">
          <a class="item">Map Viewer</a>
          <a class="item">User Viewer</a>
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
