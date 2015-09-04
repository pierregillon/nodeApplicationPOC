(function(require){
    'use strict';

    var gulp = require('gulp');
    var mocha = require('gulp-mocha');
    var karma = require('karma');
    var concat = require('gulp-concat');
    var wiredep = require('wiredep').stream;
    var wiredepSync = require('wiredep');
    var inject = require('gulp-inject');
    var uglify = require('gulp-uglify');
    var minifyCss = require('gulp-minify-css');
    var minifyHtml = require('gulp-minify-html');
    var usemin = require('gulp-usemin');
    var rev = require('gulp-rev');
    var react = require('gulp-react');
    var clean = require('gulp-clean');

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
    gulp.task('clean', function(){
        return gulp
            .src('./client/dist', {read: false})
            .pipe(clean());
    });
    gulp.task('build-client', ['clean'], function () {
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
            configFile: __dirname + '/karma.conf.js',
            files: getClientFilesToTests()
        }, callback);
        return server.start();
    });
    gulp.task('client-test-w', function(callback) {
        var server = new karma.Server({
            configFile: __dirname + '/karma.conf.js',
            files: getClientFilesToTests(),
            singleRun: false
        }, callback);
        return server.start();
    });
    gulp.task('test', ['client-test', 'server-test']);

    // ----- Internal logic
    function getClientFilesToTests(){
        var result = [];
        result = result.concat(wiredepSync({devDependencies:true}).js);
        result = result.concat([
            './client/sources/js/**/*.js',
            './client/sources/js/**/*.spec.js']);
        return result;
    }

}(require));