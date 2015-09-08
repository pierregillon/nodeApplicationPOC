(function(module, require){
    'use strict';
    module.exports = TodoApp;

    var React = require('react');
    var Panel = require('react-bootstrap').Panel;
    var PageHeader = require('react-bootstrap').PageHeader;

    function TodoApp(todoActions, TodoList, TodoAdd) {
        return React.createClass({
            componentDidMount : function(){
                todoActions.loadTodoItems();
            },
            render: function () {
                return (
                    <div>
                        <PageHeader>Todo list <small> - Add new and consult existing</small></PageHeader>
                        <Panel header='Add a new todo item' bsStyle='info'>
                            <TodoAdd />
                        </Panel>
                        <Panel header='Existing todo items' bsStyle='info'>
                            <TodoList />
                        </Panel>
                    </div>
                );
            }
        });
    }

}(module, require));