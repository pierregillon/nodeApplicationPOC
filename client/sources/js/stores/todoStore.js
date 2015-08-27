(function(ioc){
    'use strict';

    ioc.registerSingleton('TodoStore', TodoStore);

    function TodoStore(){
        var self = this;

        self.addChangeListener = function(){

        };
        self.removeChangeListener = function(){

        };
        self.getTodoItems = function(){
            return [
                {key: 1, value: 'task1'},
                {key: 2, value: 'task2'}
            ];
        };
    }

}(ioc));