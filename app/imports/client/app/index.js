import '/imports/client/app/routes.js';
import { Bert } from 'meteor/themeteorchef:bert';

Bert.defaults = {
  hideDelay: 3500,
  // Accepts: a number in milliseconds.
  style: 'fixed-top',
  // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
  // growl-bottom-left, growl-bottom-right.
  type: 'default'
  // Accepts: default, success, info, warning, danger.
};
