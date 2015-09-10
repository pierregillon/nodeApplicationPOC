(function(module, require){
    'user strict';
    module.exports = MovieApp;

    var React = require('react');
    var PageHeader = require('react-bootstrap').PageHeader;

    function MovieApp(){
        return React.createClass({
            render : function(){
                return (
                    <div>
                        <PageHeader>Movies list <small> - Consult new amazing movies</small></PageHeader>
                    </div>
                );
            }
        });
    }

}(module, require));