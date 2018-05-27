'use strict'

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin')

var paths = {
    scripts: 'src/js/**/*.js',
    styles: 'src/css/**/*.css',
    partials: 'src/partials/**/*.html',
    index: 'src/index.html',
}

var dests = {
    scripts: 'static/js/',
    styles: 'static/css/',
    layouts: 'layouts/',
    partials: 'layouts/partials',
    defaults: 'layouts/_default',
}
