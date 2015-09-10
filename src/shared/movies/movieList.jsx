(function (module, require) {
    'use strict';
    module.exports = MovieList;

    var React = require('react');
    var Reflux = require('reflux');

    function MovieList(movieStore) {
        return React.createClass({
            mixins: [Reflux.connect(movieStore, 'movies')],
            render: function () {
                return (
                    <div>
                        {this.state.movies.map(function (item) {
                            return (
                                <div>
                                    <img src={item.image} width={80} height={50}></img>
                                    <div><strong>{item.title}</strong></div>
                                    <div>{item.description}</div>
                                    <div>rating : {item.rating}</div>
                                </div>
                            );
                        }, this)}
                    </div>
                );
            }
        });
    }

}(module, require));