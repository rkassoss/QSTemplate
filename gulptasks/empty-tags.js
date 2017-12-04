'use strict';

var gulp = require('gulp'),
	path = require('path'),
	$ = require('gulp-load-plugins')();

var config = require('../gulpconfig.js');

gulp.task('empty-tags', function () {
	return gulp.src(path.join(config.src, config.html.main))
		// .pipe(replace(/<!-- (.*?):(js|css) -->([\S\s]*?)<!-- end(bower|qlik|inject) -->/gmi, ' <!-- $1:$2 -->\n<!-- end$1 -->'))
		.pipe($.replace(/<!-- inject:(.*?) -->([\S\s]*?)<!-- endinject -->/gmi, '<!-- inject:$1 -->\n\t\t<!-- endinject -->'))
		.pipe($.replace(/<!-- bower:(js|css) -->([\S\s]*?)<!-- endbower -->/gmi, '<!-- bower:$1 -->\n\t\t<!-- endbower -->'))
		.pipe(gulp.dest(config.src));
});