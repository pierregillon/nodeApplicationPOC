(function(module, require){
    'use strict';
    module.exports = Template;

    var React = require('react/addons');
    var ReactRouter = require('react-router');
    var RouteHandler = require('react-router').RouteHandler;
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


    function Template(SiteMap, Header){
        return React.createClass({
            mixins: [ ReactRouter.State ],
            render : function() {
                var key = this.getPath();
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
}(module, require));