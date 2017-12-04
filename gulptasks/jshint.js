'use strict';

var gulp = require('gulp'),
	path = require('path'),
	stylish = require('jshint-stylish'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('jshint', function () {
	var jsFiles = gulp.src([
		path.join(config.src, config.js.files),
		path.join('!' + config.src, config.bower.src, config.js.files)
	]);

	return jsFiles
		.pipe($.jshint(config.jshint))
		.pipe($.jshint.reporter(stylish));
});