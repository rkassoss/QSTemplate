'use strict';
/** 
 * Gulpfile for Qlik Sense scaffolds
 * @author Darrell Capeding <darrell.capeding@ gmail.com>
 */
var gulp = require('gulp'),
	argv = require('yargs').argv,
	requireDir = require('require-dir');

var config = require('./gulpconfig.js');

// Default server to prod if no options provided
process.env.GULPSERVER = config.server.prod;
process.env.GULPUSEPROD = true;

if (argv.desktop !== undefined) {
	process.env.GULPSERVER = config.server.dev;
	process.env.GULPUSEPROD = false;
}

gulp.task('default', ['serve']);

requireDir('./gulptasks');