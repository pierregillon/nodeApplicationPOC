(function(module){
    'use strict';
    module.exports = TodoActions;

    function TodoActions(eventPublisher, todoDataService){
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

        self.loadTodoItems = function(){
            todoDataService
                .getTodoItems()
                .then(function(items){
                    eventPublisher.publish({
                        name: 'getAllTodoItems',
                        todoItems : items
                    });
                })
        };
    }
}(module));