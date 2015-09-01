(function (React, angioc) {
    'use strict';

    angioc
        .register('TodoApp', TodoApp)
        .asClass()
        .asSingleton()
        .withDependencies(['TodoList', 'TodoAdd', 'SiteMap', 'HeaderView']);

    function TodoApp(TodoList, TodoAdd, SiteMap, Header) {
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <Header />
                        <SiteMap />
                        <div className="content">
                            <h2>Todo list : </h2>
                            <TodoAdd />
                            <TodoList />
                        </div>
                    </div>
                );
            }
        });
    }

}(React, angioc));