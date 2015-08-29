(function (React, angioc) {
    'use strict';

    angioc
        .register('TodoAdd', TodoAdd)
        .asClass()
        .asSingleton()
        .withDependencies(['TodoActions']);

    function TodoAdd(todoActions) {
        return React.createClass({
            getInitialState: function () {
                return buildState();
            },
            render: function () {
                return (
                    <div>
                        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                        <button type="button" onClick={this.addToCart}>Add</button>
                    </div>
                );
            },
            addToCart: function () {
                todoActions.addTodo(this.state.value);
            },
            handleChange: function (event) {
                this.setState(buildState(event.target.value.substr(0, 140)));
            }
        });

        // ----- Internal logic
        function buildState(value) {
            return {value: value};
        }
    }

}(React, angioc));