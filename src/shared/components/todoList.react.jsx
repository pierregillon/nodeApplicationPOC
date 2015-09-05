(function(module, require){
    'use strict';
    module.exports = TodoList;

    var React = require('react');
    var Table = require('react-bootstrap').Table;
    var Button = require('react-bootstrap').Button;

    function TodoList(todoStore, todoActions) {

        var TodoItem = React.createClass({
            render:function(){
                return (
                    <tr>
                        <td> {this.props.data.value} </td>
                        <td>
                            <Button bsStyle='danger' onClick={this.removeTodoItem}>Remove</Button>
                        </td>
                    </tr>
                )
            },
            removeTodoItem: function () {
                todoActions.removeTodo(this.props.data);
            }
        });

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
                                return (
                                    <TodoItem key={item.id} data={item}/>
                                );
                            })}
                        </tbody>
                    </Table>
                );
            },
            onChange : function () {
                this.setState(buildState());
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