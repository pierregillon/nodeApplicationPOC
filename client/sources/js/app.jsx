(function(React, angioc, ReactRouter){
    'use strict';

    var Router = ReactRouter;
    var Route = ReactRouter.Route;
    var DefaultRoute = ReactRouter.DefaultRoute;

    angioc.resolve(['TodoApp', 'AboutView'], function(TodoApp, AboutView){

        var routes = (
            <Route path="/">
                <DefaultRoute handler={TodoApp} />
                <Route name="todo" handler={TodoApp} />
                <Route name="about" handler={AboutView} />
            </Route>
        );

        Router.run(routes, function (Handler) {
            React.render(<Handler/>, document.getElementById('root'));
        });
    });

}(React, angioc, ReactRouter));