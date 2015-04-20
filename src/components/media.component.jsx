'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    var media = this.props.media;
    var thumbnailURL = media.images.thumbnail.url;
    var standardURL = media.images.standard_resolution.url;

    return (
      <a className="col-md-2" href={standardURL}>
        <img src={thumbnailURL} className="img-thumbnail" />
      </a>
    );
  }
});
