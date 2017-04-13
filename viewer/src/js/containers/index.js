import React from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'

import Map from './Map';

const routes = (
  <BrowserRouter>
    <Route path="/" component={Map}/>
  </BrowserRouter>
);

export default routes;
