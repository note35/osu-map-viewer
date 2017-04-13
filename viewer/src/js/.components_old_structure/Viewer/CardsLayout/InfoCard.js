import React from "react";

export default class InfoCard extends React.Component {

  render() {
    if(this.props.mapset != null) {
      const { general_info } = this.props.mapset.data;
      const song_info = this.props.mapset.data.maps[this.props.diff];
      if(song_info != null) {
        return (
          <div class="content">
            <div class="header">
                <a target="_blank" href={general_info.url}>{general_info.title}</a>
                (<a target="_blank" href={song_info.url}>map</a>)
            </div>
            <div class="description">
              <div class="ts list">
                <a class="item">
                  <i class="right triangle icon"></i>
                    <div class="content">
                      Artist: {general_info.artist}
                    </div>
                </a>
                <a class="item" target="_blank" href={general_info.creator_url}>
                  <i class="right triangle icon"></i>
                    <div class="content">
                      Creator: {general_info.creator}
                    </div>
                </a>
                <a class="item">
                  <i class="right triangle icon"></i>
                    <div class="content">
                      BPM: {song_info.bpm}
                    </div>
                </a>
                <a class="item">
                  <i class="right triangle icon"></i>
                    <div class="content">
                      Length: {song_info.length}
                    </div>
                </a>
              </div>
            </div>
          </div>
        )
      }
    }
    return (
      <div class="content">
        <div class="header">
        </div>
        <div class="description">
          info result will be here.
        </div>
      </div>
    );
  }
}
