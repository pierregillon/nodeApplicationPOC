(function(require){
    'use strict';

    var gulp = require('gulp');
    var mocha = require('gulp-mocha');
    var karma = require('karma');
    var concat = require('gulp-concat');
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-minify-css');
    var minifyHtml = require('gulp-minify-html');
    var usemin = require('gulp-usemin');
    var rev = require('gulp-rev');
    var react = require('gulp-react');

    // ----- Files injection
    gulp.task('inject-library-files', function () {
        return gulp
            .src('./client/sources/index.html')
            .pipe(wiredep({
                directory: './bower_components'
            }))
            .pipe(gulp.dest('./client/sources'));
    });
    gulp.task('inject-application-files', function () {
        return gulp
            .src('./client/sources/index.html')
            .pipe(inject(gulp.src([
                './client/sources/js/libraries/*',
                './client/sources/js/components/*',
                './client/sources/js/stores/*',
                './client/sources/js/actions/*',
                './client/sources/js/*',
                './client/sources/css/**/*',
                '!./client/sources/js/**/*.spec.js'], {read: false}), {relative:true}))
            .pipe(gulp.dest('./client/sources'));
    });
    gulp.task('inject-files', ['inject-library-files', 'inject-application-files']);

    // ----- Build dist
    gulp.task('build-client', function () {
        return gulp.src('./client/sources/index.html')
            .pipe(usemin({
                applicationCss: [minifyCss(), rev()],
                librariesCss: [minifyCss(), rev()],
                applicationJs: [react(), uglify(), rev()],
                librariesJs: [uglify(), rev()],
                html: [minifyHtml({empty: true})]
            }))
            .pipe(gulp.dest('./client/dist'));
    });

    // ----- Tests
    gulp.task('server-test', function () {
        return gulp
            .src('./server/**/*.spec.js', {read: false})
            .pipe(mocha());
    });
    gulp.task('client-test', function(callback) {
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js'
        }, callback);
        return server.start();
    });
    gulp.task('test', ['client-test', 'server-test']);

}(require));