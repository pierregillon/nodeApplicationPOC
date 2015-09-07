(function(module, require){
    'user strict';
    module.exports = TodoDataService;

    var q = require('q');

    function TodoDataService(){
        var self = this;

        self.getTodoItems = function(){
            var deferred = q.defer();
            setTimeout(function(){
                deferred.resolve([
                    {id: 1, value: 'Clean my room'},
                    {id: 2, value: 'Go to doctor'},
                    {id: 3, value: 'Learn more about flux architecture'}
                ]);
            }, 500);
            return deferred.promise;
        }
    }

}(module, require));