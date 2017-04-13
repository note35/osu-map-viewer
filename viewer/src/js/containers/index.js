import React from 'react';
import { Router, Route, Redirect, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Map from './Map';

const history = createBrowserHistory()

const routes = (
  <Router history={history}>
    <div>
      <Redirect from="/" to="/map" />
      <Route path="/map" component={Map}/>
    </div>
  </Router>
);

export default routes;
