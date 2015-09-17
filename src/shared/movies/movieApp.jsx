(function(module, require){
    'use strict';
    module.exports = MovieApp;

    var React = require('react');
    var PageHeader = require('react-bootstrap').PageHeader;

    function MovieApp(movieActions, movieStore, MovieList){
        return React.createClass({
            componentWillMount : function(){
                if(movieStore.getInitialState().movies.length == 0){
                    movieActions.loadMovies();
                }
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