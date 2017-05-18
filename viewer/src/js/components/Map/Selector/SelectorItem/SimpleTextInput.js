import React from "react";

export default class SimpleTextInput extends React.Component {
  render() {
    const {eventHandler, defaultText} = this.props;
    return (
      <div class="ts focus input">
        <input type="text"
          onChange={eventHandler}
          placeholder={defaultText}
        />
      </div>
    );
  }
}
