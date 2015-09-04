(function(require){
    'use strict';

    var React = require('react');
    var Router = require('react-router');
    var angioc = require('angioc');
    var Bootstrapper = require('../shared/bootstrapper');

    var bootstrapper = new Bootstrapper();
    bootstrapper.boot();

    angioc.resolve(['routes'], function(routeFactory){
        var routes = routeFactory.getRoutes();
        Router.run(routes, Router.HistoryLocation, function (Root) {
            React.render(<Root/>, document.getElementById('root'));
        });
    });

}(require));