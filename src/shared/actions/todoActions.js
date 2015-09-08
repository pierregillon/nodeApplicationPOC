(function(module){
    'use strict';
    module.exports = TodoActions;

    function TodoActions(dispatcher, todoDataService){
        var self = this;

        self.addTodo = function(text){
            todoDataService
                .addTodoItem(text)
                .then(function(newTodoItem){
                    dispatcher.dispatch({
                        actionType: 'addTodoItem',
                        item: newTodoItem
                    });
                });
        };

        self.removeTodo = function(item){
            dispatcher.dispatch({
                actionType: 'removeTodoItem',
                itemId: item.id
            });
        };

        self.loadTodoItems = function(){
            todoDataService
                .getTodoItems()
                .then(function(items){
                    dispatcher.dispatch({
                        actionType: 'getAllTodoItems',
                        todoItems : items
                    });
                });
        };
    }
}(module));