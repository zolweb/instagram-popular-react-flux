'use strict';

var React = require('react');
var MediaList = require('./components/list.component.jsx');

require('./stores/media.store').rehydrate(ISO_DATA);

React.render(React.createElement(MediaList), document.getElementById('list'));
