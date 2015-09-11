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

            loadMovies: function () {
                this.setState(buildState(true, []));
                return movieDataService.getMovies()
                    .then(this.loadMoviesCompleted.bind(this))
                    .fail(this.loadMoviesFailed.bind(this));
            },
            loadMoviesCompleted : function(movies){
                this.setState(buildState(false, movies));
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