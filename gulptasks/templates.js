'use strict';

var gulp = require('gulp'),
	path = require('path'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('templates', function () {
	var templateOptions = {
		module: 'QSTemplate'
	};

	var minifyOptions = {
		quotes: true
	};

	return gulp.src([
			path.join(config.src, config.html.files),
			path.join('!' + config.bower.src, config.html.files)
		])
		.pipe($.minifyHtml(minifyOptions))
		.pipe($.angularTemplatecache(config.html.templates, templateOptions))
		.pipe(gulp.dest(config.tmp));
})