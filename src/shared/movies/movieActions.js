(function(module, require){
    'use strict';
    module.exports = MovieActions;

    var Reflux = require('reflux');

    function MovieActions(){
        return Reflux.createActions({
            "fetchList": { asyncResult: true }
        });
    }

}(module, require));