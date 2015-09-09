(function(module, require){
    'use strict';
    module.exports = TodoAdd;

    var React = require('react');
    var Input = require('react-bootstrap').Input;
    var ButtonLoader = require('../ui/buttonLoader');

    function TodoAdd(todoActions, todoStore) {
        return React.createClass({
            getInitialState: function () {
                return buildState();
            },
            componentDidMount : function () {
                todoStore.addChangeListener(this.onChange);
            },
            componentWillUnmount : function () {
                todoStore.removeChangeListener(this.onChange);
            },
            render: function () {
                return (
                    <div>
                        <Input
                            type='text'
                            label='Enter a new task name to do :'
                            placeholder='Task name'
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyDown={this.handleInput} />

                        <ButtonLoader
                            isLoading={this.state.isAdding}
                            bsStyle='primary'
                            onClick={this.addToCart}> Add </ButtonLoader>
                    </div>
                );
            },
            onChange : function () {
                this.setState(buildState(this.state.value));
            },
            addToCart: function () {
                if(this.state.isAdding == false){
                    todoActions.addTodo(this.state.value);
                    this.setState(buildState());
                }
            },
            handleChange: function (event) {
                this.setState(buildState(event.target.value.substr(0, 140)));
            },
            handleInput: function(evt) {
                if (evt.keyCode == 13 ) {
                    this.addToCart();
                }
            }
        });

        // ----- Internal logic
        function buildState(value) {
            return {
                value: value,
                isAdding : todoStore.isAddingItem
            };
        }
    }

}(module, require));