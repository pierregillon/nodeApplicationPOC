(function(module, require){
    'use strict';
    module.exports = MovieDataService;

    var q = require('q');
    var request = require('superagent');

    function MovieDataService(){
        var self = this;

        self.getMovies = function(){
            var deferred = q.defer();
            request.get('/api/movie/all')
                .set('Accept', 'application/json')
                .send()
                .end(function (err, response) {
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(response.body);
                    }
                });
            return deferred.promise;
        };
    }

}(module, require));