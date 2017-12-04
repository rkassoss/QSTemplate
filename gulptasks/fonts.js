'use strict';

var gulp = require('gulp'),
	path = require('path'),
	$ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'main-bower-files']
	});

var config = require('../gulpconfig.js');

gulp.task('fonts', function () {
	return gulp.src($.mainBowerFiles())
		.pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(path.join(config.dist, 'fonts')));
});