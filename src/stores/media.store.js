'use strict';

var Store = require('../utils/create.store');

var mediaWaiting = [];
var media = [];

module.exports = new Store({
  name: 'media',

  handlers: {
    'GET_POPULAR': 'savePopular',
    'GET_MORE_POPULAR': 'saveMorePopular',
    'MERGE_WAITING_POPULAR': 'mergeWatingPopular'
  },

  savePopular: function (data) {
    media = data;
    this.emitChange();

    console.log('[STORE] %d media saved', data.length);
  },

  saveMorePopular: function (data) {
    mediaWaiting = mediaWaiting.concat(data);
    this.emitChange();

    console.log('[STORE] %d media waiting saved', data.length);
  },

  mergeWatingPopular: function () {
    media = media.concat(mediaWaiting);
    mediaWaiting = [];
    this.emitChange();

    console.log('[STORE] media waiting merged');
  },

  getMedia: function () {
    return media;
  },

  getMediaWaiting: function () {
    return mediaWaiting;
  },

  rehydrate: function (data) {
    media = data;
  },

  dehydrate: function () {
    return media;
  }
})
