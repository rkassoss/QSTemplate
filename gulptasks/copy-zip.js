'use strict';

var gulp = require('gulp'),
	fs = require('fs'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('copy', function () {
	return gulp.src(config.qlik.copyFiles)
		.pipe(gulp.dest(config.dist));
});

gulp.task('zip', ['copy'], function () {
	return gulp.src(config.dist + '/*')
		.pipe($.zip(config.zip))
		.pipe(gulp.dest('./'));
});