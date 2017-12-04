'use strict';

var gulp = require('gulp'),
	path = require('path'),
	wiredep = require('wiredep').stream,
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('styles', function () {

	var sassFiles = gulp.src([
		path.join(config.src, config.sass.files),
		path.join('!' + config.src, config.bower.src, config.sass.files)
	], {
		read: false
	});

	var sassInjectOptions = {
		starttag: '// inject:scss',
		endtag: '// endinject',
		transform: function (filepath) {
			return '@import "' + filepath + '";';
		},
		relative: true
	};

	return gulp.src(path.join(config.src, config.sass.main))
		.pipe($.inject(sassFiles, sassInjectOptions))
		.pipe(wiredep())
		.pipe($.sourcemaps.init())
		.pipe($.sass(config.sass.settings))
		.pipe($.autoprefixer(config.css.autoprefixer))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(config.tmp));
});