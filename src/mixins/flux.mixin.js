'use strict';

var eventEmitter = require('single-events-eventemitter');

module.exports = {

  componentDidMount: function () {
    this.stores.forEach(function (store) {
      eventEmitter.addListener(store.name, this.onChange);
    }, this);
  },

  componentDidUnmount: function () {
    this.stores.forEach(function (store) {
      eventEmitter.removeListener(store.name);
    }, this);
  }
};
