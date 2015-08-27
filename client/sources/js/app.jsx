(function(React, ioc){
    'use strict';

    ioc.resolve(['TodoApp'], function(TodoApp){
        React.render(
            <TodoApp />,
            document.getElementById('root')
        );
    });

}(React, ioc));