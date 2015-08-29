(function(angioc){
    'use strict';

    angioc
        .register('TodoActions', TodoActions)
        .asClass()
        .asSingleton()
        .withDependencies(['EventPublisher']);

    function TodoActions(eventPublisher){
        var self = this;

        self.addTodo = function(text){
            eventPublisher.publish({
                name: 'addTodoItem',
                text: text
            });
        };
    }
}(angioc));