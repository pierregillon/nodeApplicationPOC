(function(React, angioc, Router){
    'use strict';

    angioc.resolve(['RouteFactory'], function(routeFactory){
        var routes = routeFactory.getRoutes();
        Router.run(routes, Router.HashLocation, function (Root) {
            React.render(<Root/>, document.getElementById('root'));
        });
    });

}(React, angioc, ReactRouter));