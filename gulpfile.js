(function(require){
    'use strict';

    var gulp = require('gulp');
    var mocha = require('gulp-mocha');
    var del = require('del');
    var browserify = require('browserify');
    var source = require('vinyl-source-stream');
    var vinylPaths = require('vinyl-paths');

    gulp.task('clean', function(){
        return gulp
            .src('./dist', {read: false})
            .pipe(vinylPaths(del));
    });
    gulp.task('build', ['clean'], function(){
        return browserify('./src/client/js/app.jsx')
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dist/'));
    });
    gulp.task('test', function () {
        return gulp
            .src('./server/**/*.spec.js', {read: false})
            .pipe(mocha());
    });

}(require));