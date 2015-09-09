(function (module, require) {
    'user strict';

    var React = require('react');

    var Spinner = undefined;
    if (typeof window !== 'undefined') {
        Spinner = require('react-spinkit');
    }

    var Loader = React.createClass({
        render: function () {
            if (Spinner === undefined) {
                return this.renderServerLoader();
            }
            else {
                return this.renderClientLoader();
            }
        },
        renderServerLoader : function(){
            return (
                <div> Loading ... </div>
            );
        },
        renderClientLoader : function(){
            return (
                <Spinner {...this.props} noFadeIn />
            );
        }
    });

    module.exports = Loader;
}(module, require));