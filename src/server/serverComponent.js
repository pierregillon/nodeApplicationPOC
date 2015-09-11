(function (module, require) {
    'use strict';
    module.exports = ServerComponent;

    require('node-jsx').install();

    var express = require('express');
    var path = require('path');
    var q = require('q');
    var React = require('react');
    var Router = require('react-router');
    var TodoApi = require('./../shared/todo/todoApi');
    var MoviesApi = require('./../shared/movies/moviesApi');
    var bodyParser = require('body-parser');
    var _ = require('lodash');
    var html = require('fs').readFileSync('./src/client/index.html').toString();

    var angioc = require('angioc');
    var Bootstrapper = require('../shared/bootstrapper');
    var bootstrapper = new Bootstrapper();
    bootstrapper.bootServer();

    function ServerComponent() {
        var self = this;
        var server;
        var todoApi = new TodoApi();
        var moviesApi = new MoviesApi();

        self.start = function (port) {
            var app = express();

            app.use(express.static('./dist'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended: true}));

            app.get('/api/todo/all', function (request, response) {
                todoApi
                    .getTodoItems()
                    .then(function (todoItems) {
                        response.send(todoItems);
                    });
            });
            app.post('/api/todo/add', function (request, response) {
                todoApi
                    .addTodoItem(request.body['text'])
                    .then(function (newItem) {
                        response.send(newItem);
                    });
            });
            app.post('/api/todo/remove', function (request, response) {
                todoApi
                    .removeTodoItem(request.body['id'])
                    .then(function () {
                        response.send('OK');
                    });
            });
            app.get('/favicon.ico', function (request, response) {
                response.send('');
            });
            app.get('/api/movie/all', function (request, response) {
                moviesApi
                    .getMovies()
                    .then(function (movies) {
                        response.send(movies);
                    });
            });
            app.get('/images/*', function (request, response) {
                response.sendFile(path.join(__dirname, '../client/', request.path));
            });
            app.get('/*', function (request, response) {
                angioc.resolve(['routes'], function (routeFactory) {
                    Router.run(routeFactory.getRoutes(), request.url, function (Handler, state) {
                        loadData(state.path)
                            .then(function (data) {
                                var content = React.renderToString(React.createElement(Handler));
                                var template = _.template(html);
                                var rendered = template({app: content, data: JSON.stringify(data)});
                                response.send(rendered);
                            })
                            .catch(function (err) {
                                response.send(err);
                            });
                    });
                });
            });

            server = app.listen(port, function () {
                console.log('Server listening on port %s ...', port);
            });
        };
        self.stop = function () {
            server.close();
            console.log('Server stopped.');
        };

        function loadData(path) {
            var deferred = q.defer();
            switch (path) {
                case '/movies':
                    loadMovies(synchronizePromise(deferred));
                    break;
                default:
                    deferred.resolve({});
            }
            return deferred.promise;
        }

        function loadMovies(callback) {
            angioc.resolve(['movieActions'], function (movieActions) {
                var promise = movieActions.loadMovies.triggerPromise();
                callback(promise);
            });
        }

        function synchronizePromise(deferred) {
            return function(promise){
                promise
                    .then(function (movies) {
                        deferred.resolve(movies);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    });
            }
        }
    }

}(module, require));