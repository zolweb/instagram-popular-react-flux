'use strict';

var React = require('react');
var superagent = require('superagent');

var FluxMixin = require('../mixins/flux.mixin');
var Media = require('./media.component.jsx');
var loadMorePopularAction = require('../actions/loadMorePopular.action');
var mergeWaitingPopularAction = require('../actions/mergeWaitingPopular.action');
var MediaStore = require('../stores/media.store');


module.exports = React.createClass({

  mixins: [
    FluxMixin
  ],

  stores: [
    MediaStore
  ],

  getInitialState: function () {
    return {
      media: MediaStore.getMedia(),
      waiting: MediaStore.getMediaWaiting()
    };
  },

  componentDidMount: function () {
    setInterval(loadMorePopularAction, 6000);
  },

  onChange: function () {
    this.setState(this.getInitialState());
  },

  mergeWaitingPopular: function () {
    mergeWaitingPopularAction();
  },

  render: function () {
    if (this.state.waiting.length) {
      var moreMediaButton = (
        <a  className="col-md-12" onClick={this.mergeWaitingPopular}>
          Views {this.state.waiting.length} news instagram popular photos
        </a>
      );
    }

    var images = this.state.media.map(function (media) {
      return (
        <Media media={media} key={media.id} />
      );
    });

    images.reverse();

    return (
      <div>
        {moreMediaButton}
        <div className="row">
          {images}
        </div>
      </div>
    );
  }
});
