(function(angioc){
    'use strict';

    angioc
        .register('AboutView', About)
        .asClass()
        .asSingleton()
        .withDependencies(['SiteMap']);

    function About(SiteMap){
        return React.createClass({
            render: function () {
                return (
                    <div>
                        <SiteMap />
                        <h2>About</h2>
                    </div>
                );
            }
        });
    }
}(angioc));