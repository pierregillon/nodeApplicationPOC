(function (module, require) {
    'use strict';
    module.exports = MovieStore;

    var Reflux = require('reflux');

    function MovieStore(movieActions, movieDataService) {
        return Reflux.createStore({
            init: function () {
                movieActions.fetchList.listenAndPromise(this.loadMovieList);
            },

            getInitialState: function () {
                return buildState(false, []);
            },

            loadMovieList: function () {
                this.setState(buildState(true, []));
                return movieDataService.getMovies()
                    .then(this.loadMoviesCompleted)
                    .fail(this.loadMoviesFailed);
            },
            loadMoviesCompleted : function(movies){
                this.setState(buildState(false, movies));
            },
            loadMoviesFailed : function(){
                this.setState(buildState(false, []));
            },
            setState: function (state) {
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