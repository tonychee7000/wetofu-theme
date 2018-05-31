'use strict'

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    minifyCss = require('gulp-clean-css'),
    minifyJs = require('gulp-uglify'),
    clean = require('gulp-clean')

var paths = {
    scripts: 'src/js/**/*.js',
    styles: 'src/css/**/*.css',
    partials: 'src/partials/**/*.html',
    defaults: 'src/_default/**/*.html',
    indexPage: 'src/index.html',
    notFoundPage: 'src/404.html',
    header: 'src/partials/header.html',
    footer: 'src/partials/footer.html',
    fonts: 'node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*.*',
}

var dests = {
    scripts: 'static/js/',
    styles: 'static/css/',
    fonts: 'static/webfonts',
    static: 'static/',
    layouts: 'layouts/',
    partials: 'layouts/partials',
    defaults: 'layouts/_default',
    dist: 'dist',
    distCss: 'dist/css/**/*.css',
    distJs: 'dist/js/**/*.js',
    distFooter: 'dist/footer.html',
    distHeader: 'dist/header.html'
}

/**
 * Starter: Highlight.js
 */

/**
 *  First Step: CSS and JS
 */
gulp.task('css', function() {
    return gulp.src(paths.header)
    .pipe(usemin({
       css: [minifyCss(), 'concat']
    }))
    .pipe(gulp.dest(dests.dist))
})

gulp.task('js', function() {
    return gulp.src(paths.footer)
    .pipe(usemin({
        js: [minifyJs(), 'concat']
    }))
    .pipe(gulp.dest(dests.dist))
})

gulp.task('usemin', ['css', 'js'])

/**
 * Second Step: HTML partials
 */
gulp.task('html-partials', function() {
    return gulp.src(paths.partials)
    .pipe(gulp.dest(dests.partials))
})

gulp.task('html-defaults', function() {
    return gulp.src(paths.defaults)
    .pipe(gulp.dest(dests.defaults))
}) 

gulp.task('html-index', function() {
    return gulp.src(paths.indexPage)
    .pipe(gulp.dest(dests.layouts))
})

gulp.task('html-404', function() {
    return gulp.src(paths.notFoundPage)
    .pipe(gulp.dest(dests.layouts))
})

gulp.task('html', ['html-partials', 'html-defaults', 'html-index', 'html-404'])

/**
 * Third Step: Put file to correct path.
 */
gulp.task('reput-css', ['usemin'], function() {
    return gulp.src(dests.distCss)
    .pipe(gulp.dest(dests.styles))
})

gulp.task('reput-js', ['usemin'], function() {
    return gulp.src(dests.distJs)
    .pipe(gulp.dest(dests.scripts))
})

gulp.task('reput-header', ['html-partials'], function() {
    return gulp.src(dests.distHeader)
    .pipe(gulp.dest(dests.partials))
})

gulp.task('reput-footer', ['html-partials'], function() {
    return gulp.src(dests.distFooter)
    .pipe(gulp.dest(dests.partials))
})

gulp.task('remove-tmp', ['usemin', 'reput'], function() {
    return gulp.src(dests.dist, {read: false})
    .pipe(clean())
})

gulp.task('reput', ['reput-css', 'reput-js', 'reput-header', 'reput-footer'])

/**
 * Forth Step: Font Awesome
 */
gulp.task('fonts', ['usemin'], function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest(dests.fonts))
})

/**
 * Special Step: Clean all files
 */
gulp.task('clean-layouts', function() {
    return gulp.src(dests.layouts, {read: false}).pipe(clean())
})

gulp.task('clean-static', function() {
    return gulp.src(dests.static, {read: false}).pipe(clean())
})

gulp.task('clean', ['clean-layouts', 'clean-static'])

/**
 * Global Step
 */
gulp.task('build', ['usemin', 'html', 'reput', 'fonts', 'remove-tmp'])
gulp.task('default', ['build'])