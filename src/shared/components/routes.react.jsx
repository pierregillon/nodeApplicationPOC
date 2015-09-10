(function(module, require){
    'use strict';
    module.exports = RouteFactory;

    var React = require('react');
    var ReactRouter = require('react-router');
    var Route = ReactRouter.Route;
    var DefaultRoute = ReactRouter.DefaultRoute;

    function RouteFactory(Template, TodoApp, About, MovieApp){
        var self = this;

        self.getRoutes = function(){
            return (
                <Route handler={Template} path="/">
                    <DefaultRoute handler={TodoApp} />
                    <Route name="todo" handler={TodoApp} />
                    <Route name="about" handler={About} />
                    <Route name="movies" handler={MovieApp} />
                </Route>
            );
        }
    }

}(module, require));