(function(angioc, RouteHandler){
    'use strict';

    angioc
        .register('Template', Template)
        .asClass()
        .asSingleton()
        .withDependencies(['SiteMap', 'HeaderView']);

    function Template(SiteMap, Header){
        return React.createClass({
            render : function() {
                return (
                    <div>
                        <Header />
                        <SiteMap />
                        <div className="content">
                            <RouteHandler/>
                        </div>
                    </div>
                )
            }
        });
    }
}(angioc, ReactRouter.RouteHandler));