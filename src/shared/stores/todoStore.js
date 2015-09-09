(function(module, require){
    'use strict';
    module.exports = TodoStore;

    var EventEmitter = require('events').EventEmitter;
    var _ = require('lodash');

    function TodoStore(dispatcher) {
        var self = this;
        var todoItems = [];

        EventEmitter.prototype.constructor.call(self);

        self.isAddingItem = false;
        self.isRemovingItem = false;
        self.isLoadingItems = false;
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
                case 'gettingAllTodoItems':
                    self.isLoadingItems = true;
                    self.emit('change');
                    break;

                case 'getAllTodoItems':
                    todoItems = [].concat(payload.todoItems);
                    self.isLoadingItems = false;
                    self.emit('change');
                    break;

                case 'addingTodoItem':
                    self.isAddingItem = true;
                    self.emit('change');
                    break;

                case 'addTodoItem':
                    self.isAddingItem = false;
                    todoItems.push(payload.item);
                    self.emit('change');
                    break;

                case 'removingTodoItem':
                    self.isRemovingItem = true;
                    self.emit('change');
                    break;

                case 'removeTodoItem':
                    _.remove(todoItems, function(item){
                        return item.id === payload.itemId
                    });
                    self.isRemovingItem = false;
                    self.emit('change');
                    break;
            }
        });
    }

    TodoStore.prototype = Object.create(EventEmitter.prototype);
    TodoStore.prototype.constructor = EventEmitter;

}(module, require));