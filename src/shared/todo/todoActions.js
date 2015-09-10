(function(module){
    'use strict';
    module.exports = TodoActions;

    function TodoActions(dispatcher, todoDataService){
        var self = this;

        self.addTodo = function(text){
            dispatcher.dispatch({
                actionType: 'addingTodoItem'
            });
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
                actionType: 'removingTodoItem'
            });
            todoDataService
                .removeTodoItem(item.id)
                .then(function(){
                    dispatcher.dispatch({
                        actionType: 'removeTodoItem',
                        itemId: item.id
                    });
                });
        };

        self.loadTodoItems = function(){
            dispatcher.dispatch({
                actionType: 'gettingAllTodoItems'
            });
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