(function(module, require){
    'use strict';
    module.exports = TodoApp;

    var React = require('react');

    function TodoApp(TodoList, TodoAdd) {
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <h2>Todo list : </h2>
                        <TodoAdd />
                        <TodoList />
                    </div>
                );
            }
        });
    }

}(module, require));