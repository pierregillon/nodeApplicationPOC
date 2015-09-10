(function(module, require){
    'use strict';
    module.exports = SiteMap;

    var React = require('react');
    var ReactRouter = require('react-router');
    var Link = ReactRouter.Link;

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
                            <li>
                                <Link to="movies">Movies</Link>
                            </li>
                        </ul>
                    </div>
                );
            }
        });
    }
}(module, require));