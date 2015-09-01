(function(angioc){
    'use strict';

    angioc
        .register('HeaderView', About)
        .asClass()
        .asSingleton();

    function About(){
        return React.createClass({
            render: function () {
                return (
                    <div className="header">
                        My header
                    </div>
                );
            }
        });
    }
}(angioc));