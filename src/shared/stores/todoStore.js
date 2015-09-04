(function(module, require){
    'use strict';
    module.exports = TodoStore;

    var EventEmitter = require('events').EventEmitter;

    function TodoStore(eventPublisher) {
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

        eventPublisher.on('addTodoItem', function (event) {
            todoItems.push({value: event.text});
            self.emit('change');
        });
    }

    TodoStore.prototype = Object.create(EventEmitter.prototype);
    TodoStore.prototype.constructor = EventEmitter;

}(module, require));