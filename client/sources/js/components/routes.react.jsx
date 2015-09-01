(function(angioc, ReactRouter){
    'use strict';

    var Route = ReactRouter.Route;
    var DefaultRoute = ReactRouter.DefaultRoute;

    angioc
        .register('RouteFactory', RouteFactory)
        .asClass()
        .asSingleton()
        .withDependencies(['Template', 'TodoApp', 'AboutView']);

    function RouteFactory(Template, TodoApp, About){
        var self = this;

        self.getRoutes = function(){
            return (
                <Route handler={Template} path="/">
                    <DefaultRoute handler={TodoApp} />
                    <Route name="todo" handler={TodoApp} />
                    <Route name="about" handler={About} />
                </Route>
            );
        }
    }

}(angioc, ReactRouter));