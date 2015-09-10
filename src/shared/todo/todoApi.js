(function(require, module){
    'use strict';
    module.exports = TodoApi;

    var _ = require('lodash');
    var q = require('q');

    var fakeProcessTime = 500;
    var lastId = 0;
    var todoItems = [
        {id: ++lastId, value: 'Clean my room'},
        {id: ++lastId, value: 'Go to doctor'},
        {id: ++lastId, value: 'Learn more about flux architecture'}
    ];

    function TodoApi(){
        var self = this;

        self.getTodoItems = function(){
            return todoItems;
        };

        self.getTodoItems = function(){
            var deferred = q.defer();
            setTimeout(function(){
                deferred.resolve(todoItems);
            }, fakeProcessTime);
            return deferred.promise;
        };

        self.addTodoItem = function(text){
            var deferred = q.defer();
            setTimeout(function(){
                var item = {id: ++lastId, value: text};
                todoItems.push(item);
                deferred.resolve(item);
            }, fakeProcessTime);
            return deferred.promise;
        };

        self.removeTodoItem = function(id){
            var deferred = q.defer();
            setTimeout(function(){
                _.remove(todoItems, function(item) {
                    return item.id == id;
                });
                deferred.resolve();
            }, fakeProcessTime);
            return deferred.promise;
        };
    }

}(require, module));