'use strict';

var _ = require('lodash');
var superagent = require('superagent');
var dispatcher = require('flux-dispatcher');

var MediaStore = require('../stores/media.store');

module.exports = function (next) {

  next = next || function () {};

  superagent
    .get('https://api.instagram.com/v1/media/popular')
    .query({ access_token: "30587526.1677ed0.10ba562b9f9d44789bee8130cf352d4d" })
    .end(function (err, res) {
      console.log('[ACTION] %s dispatch %d media', 'GET_MORE_POPULAR', res.body.data.length);

      var mediaById = _.indexBy(MediaStore.getMedia(), 'id');
      var media = _.select(res.body.data, function (m) {
        return !mediaById[m.id];
      });

      media = media.map(function (m) {
        return {
          id: m.id,
          images: m.images
        };
      });

      dispatcher.dispatch({
        action: 'GET_MORE_POPULAR',
        data: media
      });

      return next();
    });
};
