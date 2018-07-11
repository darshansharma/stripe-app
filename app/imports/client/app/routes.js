import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import StripeApp from '/imports/client/views/StripeApp/index.js';

// const getRoutes = () => (
//   <Router history = {browserHistory}>
//     <Route path = '/' component = {StripeApp} >
//     <IndexRoute component = {StripeApp} />
//     </Route>
//   </Router>
// );

Meteor.startup(() => {
  render( <StripeApp />, document.getElementById('app'));
});
