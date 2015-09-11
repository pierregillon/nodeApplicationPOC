(function(module, require){
    'use strict';
    module.exports = MovieActions;

    var Reflux = require('reflux');

    function MovieActions(){
        return Reflux.createActions({
            "loadMovies": { asyncResult: true }
        });
    }

}(module, require));