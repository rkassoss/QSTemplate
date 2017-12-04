'use strict';

var gulp = require('gulp'),
	path = require('path'),
	wiredep = require('wiredep').stream,
	$ = require('gulp-load-plugins')(),
	ngFilesort = require('gulp-angular-filesort');

var config = require('../gulpconfig.js');

/**
 * Inject Qlik files definied in gulpconfig
 * @return {sting} string of tags to put between inject tags
 */
function injectQlik() {
	var server = process.env.GULPSERVER;
	var injectQlikOptions = {
		starttag: config.qlik.startTag,
		transform: function () {
			var tags = '';
			for (var i = 0, len = config.qlik.files.length; i < len; i++) {
				var file = config.qlik.files[i];

				// Formatting
				if (i > 0) tags += '\t\t';
				tags += path.extname(file) == '.js' ? '<script src="' + server + file + '"></script>\n' : '<link rel="stylesheet" href="' + server + file + '" />';
				//  Formatting
				if (i < len - 1) tags += '\n';
			}
			return tags;
		}
	};

	return $.inject(gulp.src(''), injectQlikOptions);
}

/**
 * Inject css, js, and Qlik specific files into index.html
 */
gulp.task('inject', ['styles', 'babel'], function () {
	var cssFiles = gulp.src([
		path.join(config.tmp, config.css.files),
		path.join('!' + config.src, config.bower.src, config.css.files)
	], {
		read: false
	});

	var jsFiles = gulp.src([
			path.join(config.src, config.js.ngFiles),
			path.join('!' + config.src, 'QlikConnect.js'),
			'!' + path.join(config.src, config.bower.src, config.js.files)
		])
		.pipe($.angularFilesort());

	var indexInjectOptions = {
		relative: true
	};

	return gulp.src(path.join(config.src, config.html.main))
		.pipe($.inject(cssFiles, indexInjectOptions))
		.pipe($.inject(jsFiles, indexInjectOptions))
		.pipe(injectQlik())
		.pipe(wiredep())
		.pipe(gulp.dest(config.src));
});