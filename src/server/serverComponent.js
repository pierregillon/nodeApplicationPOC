(function(module, require){
    'use strict';
    module.exports = ServerComponent;

    require('node-jsx').install();

    var express = require('express');
    var React = require('react');
    var Router = require('react-router');
    var TodoApi = require('./todoApi');
    var bodyParser = require('body-parser');
    var _ = require('lodash');
    var html = require('fs').readFileSync('./src/client/index.html').toString();

    var angioc = require('angioc');
    var Bootstrapper = require('../shared/bootstrapper');
    var bootstrapper = new Bootstrapper();
    bootstrapper.boot();

    function ServerComponent(){
        var self = this;
        var server;
        var api = new TodoApi();

        self.start = function(port){
            var app = express();

            app.use(express.static('./dist'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            app.get('/api/todo/all', function(request, response){
                api
                    .getTodoItems()
                    .then(function(todoItems){
                       response.send(todoItems);
                   });
            });
            app.post('/api/todo/add', function(request, response){
                api
                    .addTodoItem(request.body['text'])
                    .then(function(newItem){
                        response.send(newItem);
                    });
            });
            app.post('/api/todo/remove', function(request, response){
                api
                    .removeTodoItem(request.body['id'])
                    .then(function(){
                        response.send('OK');
                    });
            });
            app.get('/*', function (request, response) {
                angioc.resolve(['routes'], function(routeFactory){
                    var routes = routeFactory.getRoutes();
                    Router.run(routes, request.url, function(Handler){
                        var content = React.renderToString(React.createElement(Handler));
                        var template = _.template(html);
                        var rendered = template({app : content});
                        response.send(rendered);
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