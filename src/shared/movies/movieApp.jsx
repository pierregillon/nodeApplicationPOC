(function(module, require){
    'user strict';
    module.exports = MovieApp;

    var React = require('react');
    var PageHeader = require('react-bootstrap').PageHeader;

    function MovieApp(movieActions, MovieList){
        return React.createClass({
            componentWillMount : function(){
                movieActions.fetchList();
            },
            render : function(){
                return (
                    <div>
                        <PageHeader>Movies list <small> - Consult new amazing movies</small></PageHeader>
                        <MovieList />
                    </div>
                );
            }
        });
    }

}(module, require));