(function(ioc){
    'use strict';

    ioc.registerClass('TodoActions', TodoActions);

    TodoActions.$dependencies = ['EventPublisher'];

    function TodoActions(eventPublisher){
        var self = this;

        self.addTodo = function(text){
            eventPublisher.publish({
                name: 'addTodoItem',
                text: text
            });
        };
    }
}(ioc));