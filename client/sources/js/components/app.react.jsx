(function (React, ioc) {
    'use strict';

    ioc.registerSingleton('TodoApp', TodoApp);

    TodoApp.$dependencies = ['TodoStore'];

    function TodoApp(todoStore) {
        var self = {};

        self.getInitialState = function () {
            return buildState();
        };
        self.componentDidMount = function () {
            todoStore.addChangeListener(onChange);
        };
        self.componentWillUnmount = function() {
            todoStore.removeChangeListener(onChange);
        };
        self.render = function() {
            return (
                <div>
                    {this.state.todoItems.map(function(item){
                        return (
                            <li>{item.value}</li>
                        );
                    })}
                </div>
            );
        };

        // ----- Internal logic
        function onChange() {
            this.setState(buildState());
        }
        function buildState() {
            return {
                todoItems: todoStore.getTodoItems()
            }
        }

        return React.createClass(self);
    }

}(React, ioc));