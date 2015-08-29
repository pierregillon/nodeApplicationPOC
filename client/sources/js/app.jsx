(function(React, angioc){
    'use strict';

    angioc.resolve(['TodoApp'], function(TodoApp){
        React.render(
            <TodoApp />,
            document.getElementById('root')
        );
    });

}(React, angioc));