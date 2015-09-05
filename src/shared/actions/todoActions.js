(function(module){
    'use strict';
    module.exports = TodoActions;

    function TodoActions(eventPublisher){
        var self = this;

        self.addTodo = function(text){
            eventPublisher.publish({
                name: 'addTodoItem',
                text: text
            });
        };

        self.removeTodo = function(item){
            eventPublisher.publish({
                name: 'removeTodoItem',
                itemId: item.id
            });
        };
    }
}(module));