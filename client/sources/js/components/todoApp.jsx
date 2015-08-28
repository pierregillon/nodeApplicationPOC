(function (React, ioc) {
    'use strict';

    ioc.registerSingleton('TodoApp', TodoApp);

    TodoApp.$dependencies = ['TodoList', 'TodoAdd'];

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

}(React, ioc));