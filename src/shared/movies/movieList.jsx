(function (module, require) {
    'use strict';
    module.exports = MovieList;

    var React = require('react');
    var Reflux = require('reflux');
    var Loader = require('../ui/loader');

    function MovieList(movieStore, MovieItem) {
        return React.createClass({
            mixins: [Reflux.connect(movieStore, 'store')],
            render: function () {
                if (this.state.store.isLoading) {
                    return (
                        <Loader spinnerName='three-bounce'></Loader>
                    );
                }
                else {
                    return (
                        <div>
                            {this.state.store.movies.map(function (item) {
                                return (
                                    <MovieItem key={item.id} item={item}/>
                                );
                            }, this)}
                        </div>
                    );
                }
            }
        });
    }

}(module, require));