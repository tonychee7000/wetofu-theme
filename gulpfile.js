'use strict'

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyHTML = require('gulp-htmlmin')

var paths = {
    scripts: 'src/js/**/*.js',
    styles: 'src/css/**/*.css',
    partials: 'src/partials/**/*.html',
    defaults: 'src/_default/**/*.html',
    index: 'src/index.html',
    header: 'src/partials/header.html',
    footer: 'src/partials/footer.html',
    fonts: 'node_modules/@fortawesome/'
}

var dests = {
    scripts: 'static/js/',
    styles: 'static/css/',
    static: 'static/',
    layouts: 'layouts/',
    partials: 'layouts/partials',
    defaults: 'layouts/_default',
}

gulp.task('css', function() {
    return gulp.src(paths.header)
    .pipe(usemin({
       css: [minifyCss({keepSpecialComments: 0}), 'concat']
    }))
    .pipe(gulp.dest(dests.styles))
})

gulp.task('js', function() {
    return gulp.src(paths.footer)
    .pipe(usemin({
        js: [minifyJs(), 'concat']
    }))
    .pipe(gulp.dest(dest.scripts))
})

gulp.task('usemin', ['css', 'js'])

gulp.task('html-partials', function() {
    return gulp.src(paths.partials)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dest.partials))
})

gulp.task('html-defaults', function() {
    return gulp.src(paths.defaults)
    .pipe(minifyHTML())
    .pipe(gulp.dest(dest.defaults))
}) 

gulp.task('html', ['html-partials', 'html-defaults'])

gulp.task('build', ['usemin', 'html'])
gulp.task('default', ['build'])