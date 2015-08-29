(function (React, angioc) {
    'use strict';

    angioc
        .register('TodoApp', TodoApp)
        .asClass()
        .asSingleton()
        .withDependencies(['TodoList', 'TodoAdd']);

    function TodoApp(TodoList, TodoAdd) {
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <TodoAdd />
                        <TodoList />
                    </div>
                );
            }
        });
    }

}(React, angioc));