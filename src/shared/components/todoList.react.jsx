(function(module, require){
    'use strict';
    module.exports = TodoList;

    var React = require('react');
    var Table = require('react-bootstrap').Table;

    function TodoList(TodoItem, todoStore, todoActions) {
        return React.createClass({
            getInitialState : function () {
                return buildState();
            },
            componentDidMount : function () {
                todoStore.addChangeListener(this.onChange);
            },
            componentWillUnmount : function () {
                todoStore.removeChangeListener(this.onChange);
            },
            render : function () {
                return (
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th width={100}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.todoItems.map(function(item){
                                var boundClick = this.removeTodoItem.bind(this, item);
                                return (
                                    <TodoItem key={item.id} data={item} onRemoveRequested={boundClick}/>
                                );
                            }, this)}
                        </tbody>
                    </Table>
                );
            },
            onChange : function () {
                this.setState(buildState());
            },
            removeTodoItem: function (item) {
                todoActions.removeTodo(item);
            }
        });

        // ----- Internal logic
        function buildState() {
            return {
                todoItems: todoStore.getTodoItems()
            };
        }
    }
}(module, require));