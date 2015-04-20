'use strict';

var _ = require('lodash');
var dispatcher = require('flux-dispatcher');
var eventEmitter = require('single-events-eventemitter');

var CreateStore = function(storeDef) {

  storeDef.emitChange = function () {
    eventEmitter.emit(storeDef.name);
  };

  // Automatically register a callback for each action to the specified method
  _.forEach(storeDef.handlers, function(handler, action) {
    dispatcher.register(function(payload) {
      if(payload.action === action) {
        storeDef[handler](payload.data);
      }
    });
  });

  // Attach methods to instance
  _.extend(this, storeDef);

};

module.exports = CreateStore;
