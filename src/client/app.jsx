(function(require){
    'use strict';

    var React = require('react');
    var Router = require('react-router');
    var angioc = require('angioc');
    var Bootstrapper = require('../shared/bootstrapper');

    var bootstrapper = new Bootstrapper();
    bootstrapper.boot({mode: 'CLIENT'});

    angioc.resolve(['routes', 'movieStore'], function(routeFactory, movieStore){
        var initialData = JSON.parse(document.getElementById("initial-data").innerHTML);
        if(initialData){
            movieStore.setInitialState({isLoading:false, movies:initialData});
        }
        var routes = routeFactory.getRoutes();
        Router.run(routes, Router.HistoryLocation, function (Root) {
            React.render(<Root storeHasBeenInitialized={initialData !== undefined}/>, document.getElementById('root'));
        });
    });

}(require));