(function (React, angioc) {
    'use strict';

    angioc
        .register('TodoApp', TodoApp)
        .asClass()
        .asSingleton()
        .withDependencies(['TodoList', 'TodoAdd', 'SiteMap']);

    function TodoApp(TodoList, TodoAdd, SiteMap) {
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <SiteMap />
                        <TodoAdd />
                        <TodoList />
                    </div>
                );
            }
        });
    }

}(React, angioc));