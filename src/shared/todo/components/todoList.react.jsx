(function (module, require) {
    'use strict';
    module.exports = TodoList;

    var React = require('react');
    var Table = require('react-bootstrap').Table;
    var Loader = require('../../ui/loader');

    function TodoList(TodoItem, todoStore, todoActions) {
        return React.createClass({
            getInitialState: function () {
                return buildState();
            },
            componentDidMount: function () {
                todoStore.addChangeListener(this.onChange);
            },
            componentWillUnmount: function () {
                todoStore.removeChangeListener(this.onChange);
            },
            render: function () {
                if (this.state.isLoading) {
                    return this.renderLoading();
                }
                else {
                    return this.renderTodoItems();
                }
            },
            renderLoading: function () {
                return (
                    <div className='loader'>
                        <Loader spinnerName='three-bounce' noFadeIn />
                    </div>
                );
            },
            renderTodoItems: function () {
                return (
                    <div>
                        <div style={this.state.todoItems.length == 0 ? undefined : {display : 'none'}}>
                            There is currently no tasks to do.
                        </div>
                        <Table striped bordered condensed hover
                               style={this.state.todoItems.length == 0 ? {display : 'none'} : undefined}>
                            <thead>
                            <tr>
                                <th>Item</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.todoItems.map(function (item) {
                                var boundClick = this.removeTodoItem.bind(this, item);
                                return (
                                    <TodoItem key={item.id} data={item} onRemoveRequested={boundClick}/>
                                );
                            }, this)}
                            </tbody>
                        </Table>
                    </div>
                );
            },
            onChange: function () {
                this.setState(buildState());
            },
            removeTodoItem: function (item) {
                todoActions.removeTodo(item);
            }
        });

        // ----- Internal logic
        function buildState() {
            return {
                isLoading: todoStore.isLoadingItems,
                todoItems: todoStore.getTodoItems()
            };
        }
    }
}(module, require));