(function(require){
    'use strict';

    var gulp = require('gulp');
    var mocha = require('gulp-mocha');
    var karma = require('karma');
    var concat = require('gulp-concat');

    gulp.task('build-client-application', function() {
        return gulp
            .src([
                './client/sources/**/*.module.js',
                './client/sources/**/*.controller.js',
                '!./client/sources/**/*.spec.js'])
            .pipe(concat('application.js'))
            .pipe(gulp.dest('./client/dist/'));
    });

    gulp.task('build-client-libraries', function() {
        return gulp
            .src([
                './node_modules/angular/angular.js'
            ])
            .pipe(concat('libraries.js'))
            .pipe(gulp.dest('./client/dist/'));
    });

    gulp.task('build-client', ['build-client-application', 'build-client-libraries']);

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