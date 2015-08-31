(function(angioc){
    'use strict';

    angioc
        .register('SiteMap', SiteMap)
        .asClass()
        .asSingleton();

    function SiteMap(){
        return React.createClass({
            render: function () {
                return (
                    <ul>
                        <li><a href="#/todo">Todo application</a></li>
                        <li><a href="#/about">About</a></li>
                    </ul>
                );
            }
        });
    }
}(angioc));