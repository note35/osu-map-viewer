import React from "react";
import { Radar } from 'react-chartjs-2';

export default class ChartCard extends React.Component {

  getIncDecClass(val) {
    return (val >= 0 ? "increment" : "decrement");
  }

  render() {
    if(this.props.mapset != null) {
      const { general_info } = this.props.mapset.data;
      const song_info = this.props.mapset.data.maps[this.props.diff];

      if(song_info != null) {

        const rader_data = {
          labels: ["CS", "AR", "OD", "HP", "Star"],
          datasets: [
            {
              label: this.props.diff,
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [song_info.cs, song_info.ar, song_info.od, song_info.hp, song_info.star]
            }
          ]
        }

        const previous_song_info = this.props.mapset.data.maps[this.props.previous_diff]
        const difference = {
          cs: 0,
          ar: 0,
          od: 0,
          hp: 0,
          star: 0,
        }
        if(previous_song_info != null) {
          difference.cs = (song_info.cs - previous_song_info.cs).toFixed(2)
          difference.ar = (song_info.ar - previous_song_info.ar).toFixed(2)
          difference.od = (song_info.od - previous_song_info.od).toFixed(2)
          difference.hp = (song_info.hp - previous_song_info.hp).toFixed(2)
          difference.star = (song_info.star - previous_song_info.star).toFixed(2)

          rader_data.datasets.push({
            label: this.props.previous_diff,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [previous_song_info.cs, previous_song_info.ar, previous_song_info.od, previous_song_info.hp, previous_song_info.star]
          })
        }

        return (
          <div class="content">
            <div class="header">
              Chart
            </div>

            <div class="description">
              <div class="ts basic borderless slate vertically fitted">
                <Radar 
                  data={rader_data}
                />
              </div>

              <div class="ts mini statistic">
                <div class="value">
                  CS: {song_info.cs}
                  <div class={this.getIncDecClass(difference.cs)}>{difference.cs}</div>
                </div>
              </div>
              <div class="ts mini statistic">
                <div class="value">
                  AR: {song_info.ar}
                  <div class={this.getIncDecClass(difference.ar)}>{difference.ar}</div>
                </div>
              </div>
              <div class="ts mini statistic">
                <div class="value">
                  OD: {song_info.od}
                  <div class={this.getIncDecClass(difference.od)}>{difference.od}</div>
                </div>
              </div>
              <div class="ts mini statistic">
                <div class="value">
                  HP: {song_info.hp}
                  <div class={this.getIncDecClass(difference.hp)}>{difference.hp}</div>
                </div>
              </div>
              <div class="ts mini statistic">
                <div class="value">
                  star: {song_info.star}
                  <div class={this.getIncDecClass(difference.star)}>{difference.star}</div>
                </div>
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
          chart result will be here.
        </div>
      </div>
    );
  }
}
