(function(module, require){
    'use strict';
    module.exports = MovieStore;

    var Reflux = require('reflux');

    function MovieStore(movieActions, movieDataService){

        var movies = [];

        return Reflux.createStore({
            listenables: [movieActions],

            getInitialState : function(){
                return movies;
            },

            init: function() {
                this.fetchList();
            },

            fetchList: function() {
                movieDataService.getMovies().then(function(results){
                    movies = results;
                    this.trigger(movies);
                }.bind(this));
            }
        });
    }

}(module, require));