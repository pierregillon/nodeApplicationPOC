(function(module, require){
    'use strict';
    module.exports = ServerComponent;

    require('node-jsx').install();

    var express = require('express');
    var path = require('path');
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

    function ServerComponent(){
        var self = this;
        var server;
        var todoApi = new TodoApi();
        var moviesApi = new MoviesApi();

        self.start = function(port){
            var app = express();

            app.use(express.static('./dist'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            app.get('/api/todo/all', function(request, response){
                todoApi
                    .getTodoItems()
                    .then(function(todoItems){
                       response.send(todoItems);
                   });
            });
            app.post('/api/todo/add', function(request, response){
                todoApi
                    .addTodoItem(request.body['text'])
                    .then(function(newItem){
                        response.send(newItem);
                    });
            });
            app.post('/api/todo/remove', function(request, response){
                todoApi
                    .removeTodoItem(request.body['id'])
                    .then(function(){
                        response.send('OK');
                    });
            });
            app.get('/favicon.ico', function(request, response){
                response.send('');
            });
            app.get('/api/movie/all', function(request, response){
                moviesApi
                    .getMovies()
                    .then(function(movies){
                        response.send(movies);
                    });
            });
            app.get('/images/*', function(request, response){
                response.sendFile(path.join(__dirname, '../client/', request.path));
            });
            app.get('/*', function (request, response) {
                angioc.resolve(['routes', 'movieActions'], function(routeFactory, movieActions){
                    movieActions.loadMovies.triggerPromise()
                        .then(function(movies) {
                            var routes = routeFactory.getRoutes();
                            Router.run(routes, request.url, function(Handler){
                                var content = React.renderToString(React.createElement(Handler));
                                var template = _.template(html);
                                var rendered = template({app : content, data : JSON.stringify(movies)});
                                response.send(rendered);
                            });
                        })
                        .catch(function(err){
                            response.send(err);
                        });
                });
            });

            server = app.listen(port, function () {
                console.log('Server listening on port %s ...', port);
            });
        };
        self.stop = function(){
            server.close();
            console.log('Server stopped.');
        };
    }

}(module, require));