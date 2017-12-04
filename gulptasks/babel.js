'use strict';

var gulp = require('gulp'),
	path = require('path'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('babel', ['jshint'], function () {
	return gulp.src([
			path.join(config.src, config.js.files),
			path.join('!' + config.src, config.bower.src, config.js.files)
		])
		.pipe($.babel({
			blacklist: ['strict']
		}))
		.pipe(gulp.dest(config.src));
});