'use strict';

var gulp = require('gulp'),
	runSeq = require('run-sequence');

gulp.task('deploy', function () {
	runSeq('build', 'zip');
});

gulp.task('deploy:dev');