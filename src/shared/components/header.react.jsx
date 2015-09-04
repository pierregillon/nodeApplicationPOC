(function(module, require){
    'use strict';
    module.exports = About;
    
    var React = require('react');

    function About(){
        return React.createClass({
            render: function () {
                return (
                    <div className="header">
                        My header
                    </div>
                );
            }
        });
    }
}(module, require));