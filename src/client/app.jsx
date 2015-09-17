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
            document.getElementById("initial-data").innerHTML = '';
        }
        var routes = routeFactory.getRoutes();
        Router.run(routes, Router.HistoryLocation, function (Root) {
            React.render(<Root />, document.getElementById('root'));
        });
    });

}(require));