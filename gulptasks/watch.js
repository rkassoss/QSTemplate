'use strict';

var gulp = require('gulp'),
	path = require('path'),
	_ = require('lodash'),
	$ = require('gulp-load-plugins')(),
	bs = require('browser-sync');

var config = require('../gulpconfig.js');

var reloadBrowser = _.debounce(_reloadBrowser, 200);

function _reloadBrowser(path) {
	bs.reload();
}

gulp.task('watch', ['empty-tags', 'inject'], function () {
	gulp.watch(path.join(config.src, config.js.files), jsChanges);

	gulp.watch([
		path.join(config.src, config.html.files),
		'bower.json'
	], htmlChanges);

	gulp.watch(path.join(config.src, config.sass.files), sassChanges);
});

/**
 * Handles addition, changes, and removals of js files in app/
 * @todo  Test tasks go here once they're written.
 */
function jsChanges(e) {
	// Run babel if files have only changed
	if (e.type === 'changed') {
		gulp.start('babel', function () {
			reloadBrowser();
		});
	} else {
		// Inject if files were removed or added
		gulp.start('inject', function () {
			reloadBrowser();
		});
	}
}

/**
 * Injects when any html file event is caught
 */
function htmlChanges(e) {
	gulp.start('inject', function () {
		reloadBrowser();
	});
}

/**
 * Handles addition, changes, and removals of sass files in app/
 */
function sassChanges(e) {
	// Run styles task if files have only changed
	if (e.type === 'changed') {
		gulp.start('styles', function () {
			reloadBrowser(path);
		});
	} else {
		// Inject if files were removed or added
		gulp.start('inject', function () {
			reloadBrowser(path);
		});
	}
}