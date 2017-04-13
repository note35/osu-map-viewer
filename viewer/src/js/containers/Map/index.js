import React from "react";
import { connect } from "react-redux";

import Nav from '../Core/Nav';
import Footer from '../Core/Footer';
import Selector from './Selector';
import Viewer from './Viewer';

export default class Map extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <Selector />
        <Viewer />
        <Footer />
      </div>
    );
  }
}
