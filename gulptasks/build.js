'use strict';

var gulp = require('gulp'),
	path = require('path'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('build', ['clean:dist', 'inject', 'fonts', 'templates'], function () {

	var templateFiles = gulp.src(path.join(config.tmp, config.html.templates), {
		read: false
	});

	var injectOptions = {
			starttag: '<!-- inject:templates -->',
			relative: true
		},
		annotateOptions = {
			add: true,
			'single_quotes': true
		},
		uglifyOptions = {
			mangle: true
		},
		filterOptions = {
			restore: true
		};

	var assets = $.useref.assets();
	var jsFilter = $.filter(config.js.files, filterOptions);
	var cssFilter = $.filter(config.css.files, filterOptions);

	return gulp.src(path.join(config.src, config.html.main))
		.pipe($.inject(templateFiles, injectOptions))
		.pipe(assets)
		.pipe($.rev())
		.pipe(jsFilter)
		.pipe($.debug())
		.pipe($.ngAnnotate(annotateOptions))
		.pipe($.concat(config.js.minName))
		.pipe($.uglify(uglifyOptions))
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe($.replace('../vendor/font-awesome/fonts', '../fonts/'))
		.pipe($.replace('../vendor/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
		.pipe($.csso())
		.pipe(cssFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(gulp.dest(config.dist));
});