(function(module, require){
    'use strict';
    module.exports = Template;

    var React = require('react/addons');
    var RouteHandler = require('react-router').RouteHandler;
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


    function Template(SiteMap, Header){
        return React.createClass({
            render : function() {
                var key = "";
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