'use strict';

var gulp = require('gulp'),
	bs = require('browser-sync');

var config = require('../gulpconfig.js');

gulp.task('serve', ['watch'], function () {
	bs({
		server: {
			baseDir: config.src
		}
	});
});
gulp.task('serve:build', ['build'], function () {
	bs({
		server: {
			baseDir: config.dist
		}
	});
});