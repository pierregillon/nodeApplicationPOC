(function (module, require) {
    'use strict';
    module.exports = MovieStore;

    var Reflux = require('reflux');

    function MovieStore(movieActions, movieDataService) {

        var currentState = buildState(false, []);

        return Reflux.createStore({
            init: function () {
                movieActions.loadMovies.listenAndPromise(this.loadMovies);
            },

            getInitialState: function () {
                return currentState;
            },
            setInitialState : function(state){
                currentState = state;
            },

            loadMovies: function () {
                this.setState(buildState(true, []));
                var self = this;
                return movieDataService.getMovies()
                    .then(self.loadMoviesCompleted.bind(this))
                    .fail(self.loadMoviesFailed.bind(this));
            },
            loadMoviesCompleted : function(movies){
                this.setState(buildState(false, movies));
                return movies;
            },
            loadMoviesFailed : function(){
                this.setState(buildState(false, []));
            },
            setState: function (state) {
                currentState = state;
                this.trigger(state);
            }
        });

        function buildState(loading, data) {
            return {
                movies: data,
                isLoading: loading
            }
        }
    }

}(module, require));