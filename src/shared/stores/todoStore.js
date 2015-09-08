(function(module, require){
    'use strict';
    module.exports = TodoStore;

    var EventEmitter = require('events').EventEmitter;

    function TodoStore(dispatcher) {
        var self = this;
        var todoItems = [];

        EventEmitter.prototype.constructor.call(self);

        self.addChangeListener = function (callback) {
            self.on('change', callback);
        };
        self.removeChangeListener = function (callback) {
            self.removeListener('change', callback);
        };
        self.getTodoItems = function () {
            return todoItems;
        };

        dispatcher.register(function(payload) {
            switch(payload.actionType){
                case 'getAllTodoItems':
                    todoItems = [].concat(payload.todoItems);
                    self.emit('change');
                    break;
                case 'addTodoItem':
                    todoItems.push(payload.item);
                    self.emit('change');
                    break;
                case 'removeTodoItem':
                    var itemToDelete;
                    todoItems.forEach(function(item){
                        if(item.id === payload.itemId){
                            itemToDelete = item;
                        }
                    });
                    if(itemToDelete !== undefined){
                        todoItems.splice(todoItems.indexOf(itemToDelete), 1);
                        self.emit('change');
                    }
                    break;
            }
        });
    }

    TodoStore.prototype = Object.create(EventEmitter.prototype);
    TodoStore.prototype.constructor = EventEmitter;

}(module, require));