(function(require){
    'use strict';

    var gulp = require('gulp');
    var concatCss = require('gulp-concat-css');
    var mocha = require('gulp-mocha');
    var del = require('del');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var vinylPaths = require('vinyl-paths');
    var runSequence = require('run-sequence');

    gulp.task('clean', function(){
        return gulp
            .src('./dist', {read: false})
            .pipe(vinylPaths(del));
    });
    gulp.task('build-scripts', function(){
        return browserify('./src/client/js/app.jsx')
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dist/scripts/'));
    });
    gulp.task('build-styles', function(){
        return gulp
            .src('./src/client/css/**/*.css')
            .pipe(concatCss('bundle.css'))
            .pipe(gulp.dest('./dist/styles/'));
    });
    gulp.task('build', function(callback){
        runSequence('clean', ['build-scripts', 'build-styles'], callback);
    });
    gulp.task('test', function () {
        return gulp
            .src('./server/**/*.spec.js', {read: false})
            .pipe(mocha());
    });

}(require));