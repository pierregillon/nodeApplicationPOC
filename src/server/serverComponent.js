(function(module, require){
    'use strict';
    module.exports = ServerComponent;

    require('node-jsx').install();

    var express = require('express');
    var path = require('path');
    var React = require('react');
    var Router = require('react-router');
    var Template = require('./template');

    var angioc = require('angioc');
    var Bootstrapper = require('../shared/bootstrapper');
    var bootstrapper = new Bootstrapper();
    bootstrapper.boot();

    function ServerComponent(){
        var self = this;
        var server;
        var template = new Template('../client/index.html');

        self.start = function(port){
            var app = express();

            app.use(express.static('./dist'));

            app.get('/*', function (req, res) {
                angioc.resolve(['routes'], function(routeFactory){
                    var routes = routeFactory.getRoutes();
                    Router.run(routes, req.url, function(Handler){
                        var content = React.renderToString(React.createElement(Handler));
                        template
                            .render({app: content})
                            .then(function(rendered){
                                res.send(rendered);
                            });
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