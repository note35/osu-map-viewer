import React from 'react';
import { Router, Route, Redirect, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Map from './Map';
import User from './User';

const history = createBrowserHistory()

const routes = (
  <Router history={history}>
    <div>
      <Redirect from="/" to="/map" />
      <Route path="/map" component={Map} />
      <Route path="/user" component={User} />
    </div>
  </Router>
);

export default routes;
