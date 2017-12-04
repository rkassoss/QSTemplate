'use strict';

var gulp = require('gulp'),
	path = require('path'),
	del = require('del');

var config = require('../gulpconfig.js');

gulp.task('clean', function () {
	del.sync([config.tmp, config.zip, config.dist]);
});
gulp.task('clean:tmp', function () {
	del.sync([config.tmp]);
});
gulp.task('clean:dist', function () {
	del.sync([config.dist, config.zip]);
});