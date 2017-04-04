import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import Store from "./store";

const app = document.getElementById('app');
ReactDOM.render(<Provider store={Store}>
  <Layout/>
</Provider>, app);
