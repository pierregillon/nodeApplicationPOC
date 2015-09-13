(function(module, require){
    'use strict';
    module.exports = TodoDataService;

    var q = require('q');
    var request = require('superagent');

    function TodoDataService(){
        var self = this;

        self.getTodoItems = function(){
            var deferred = q.defer();
            request.get('/api/todo/all')
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

        self.addTodoItem = function(text){
            var deferred = q.defer();
            request.post('/api/todo/add')
                .set('Accept', 'application/json')
                .send({text: text})
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

        self.removeTodoItem = function(id){
            var deferred = q.defer();
            request.post('/api/todo/remove')
                .set('Accept', 'application/json')
                .send({id: id})
                .end(function (err, response) {
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve();
                    }
                });
            return deferred.promise;
        };
    }

}(module, require));