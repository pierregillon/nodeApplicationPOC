(function(module, require){
    'user strict';
    module.exports = TodoDataService;

    var q = require('q');

    var lastTodoId = 0;
    var fakeProcessTime = 500;

    function TodoDataService(){
        var self = this;

        var data = [
            {id: ++lastTodoId, value: 'Clean my room'},
            {id: ++lastTodoId, value: 'Go to doctor'},
            {id: ++lastTodoId, value: 'Learn more about flux architecture'}
        ];

        self.getTodoItems = function(){
            var deferred = q.defer();
            setTimeout(function(){
                deferred.resolve(data);
            }, fakeProcessTime);
            return deferred.promise;
        };

        self.addTodoItem = function(text){
            var deferred = q.defer();
            setTimeout(function(){
                var item = {id: ++lastTodoId, value: text};
                data.push(item);
                deferred.resolve(item);
            }, fakeProcessTime);
            return deferred.promise;
        };
    }

}(module, require));