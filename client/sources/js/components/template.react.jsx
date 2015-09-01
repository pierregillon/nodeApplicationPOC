(function(angioc, Router, RouteHandler){
    'use strict';

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    angioc
        .register('Template', Template)
        .asClass()
        .asSingleton()
        .withDependencies(['SiteMap', 'HeaderView']);

    function Template(SiteMap, Header){
        return React.createClass({
            render : function() {
                var key = window.location.hash;
                return (
                    <div>
                        <Header />
                        <SiteMap />
                        <div className="content">
                            <ReactCSSTransitionGroup transitionName="pageTransition" transitionLeave={false}>
                                <RouteHandler key={key}/>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>
                )
            }
        });
    }
}(angioc, ReactRouter, ReactRouter.RouteHandler));