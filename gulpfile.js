'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');
var webpack = require('gulp-webpack');

gulp.task('webpack', function () {
  gulp.src('src/main.js')
    .pipe(webpack({
      output: {
        filename: "bundle.js"
      },
      module: {
        loaders: [
          {test: /\.jsx$/, loader: 'jsx-loader'}
        ]
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['webpack'], function () {
  var server = gls.new(['server.js']);
  server.start();

  gulp.watch(['src/**/*.{html,css,js,jsx}'], ['webpack']);
  gulp.watch(['src/**/*.{html,css,js,jsx}'], server.notify);
  gulp.watch(['server.js'], server.start);
});
