'use strict';

var _ = require('lodash');
var superagent = require('superagent');
var dispatcher = require('flux-dispatcher');

var MediaStore = require('../stores/media.store');

module.exports = function (next) {

  next = next || function () {};

  dispatcher.dispatch({
    action: 'MERGE_WAITING_POPULAR'
  });

  return next();
};
