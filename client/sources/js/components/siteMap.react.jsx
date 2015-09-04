(function(angioc, ReactRouter){
    'use strict';

    var Link = ReactRouter.Link;

    angioc
        .register('SiteMap', SiteMap)
        .asClass()
        .asSingleton();

    function SiteMap(){
        return React.createClass({
            render: function () {
                return (
                    <div className="siteMap">
                        <ul>
                            <li>
                                <Link to="todo">Todo application</Link>
                            </li>
                            <li>
                                <Link to="about">About</Link>
                            </li>
                        </ul>
                    </div>
                );
            }
        });
    }
}(angioc, ReactRouter));