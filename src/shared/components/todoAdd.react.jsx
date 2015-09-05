(function(module, require){
    'use strict';
    module.exports = TodoAdd;

    var React = require('react');
    var Input = require('react-bootstrap').Input;
    var Button = require('react-bootstrap').Button;

    function TodoAdd(todoActions) {
        return React.createClass({
            getInitialState: function () {
                return buildState();
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

                        <Button
                            bsStyle='primary'
                            onClick={this.addToCart}>Add</Button>
                    </div>
                );
            },
            addToCart: function () {
                todoActions.addTodo(this.state.value);
                this.setState(buildState());
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
            return {value: value};
        }
    }

}(module, require));