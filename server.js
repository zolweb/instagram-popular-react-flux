'use strict';

var jsx = require('node-jsx');
jsx.install();

var express = require('express');
var ejs = require('ejs');

var React = require('react');
var loadPopularAction = require('./src/actions/loadPopular.action');
var MediaStore = require('./src/stores/media.store');
var MediaList = require('./src/components/list.component.jsx');

var app = express();
app.use(require('connect-livereload')());

app.set('view engine', 'ejs');

app.use(express.static('./node_modules'));
app.use(express.static('./dist'));
app.use(express.static('./src'));

app.get('/', function (req, res) {

  loadPopularAction(function () {
    var markup = React.renderToString(React.createElement(MediaList));
    var mediaStoreData = 'var ISO_DATA = ' + JSON.stringify(MediaStore.getMedia()) + ';';

    res.render('index', {
      markup: markup,
      mediaStoreData: mediaStoreData
    });
  });
});

app.listen(3000, function () {
  console.log('Server started');
});
