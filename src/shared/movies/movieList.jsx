(function (module, require) {
    'use strict';
    module.exports = MovieList;

    var React = require('react');
    var Reflux = require('reflux');
    var Loader = require('../ui/loader');

    function MovieList(movieStore) {
        return React.createClass({
            mixins: [Reflux.connect(movieStore, 'store')],
            render: function () {
                if(this.state.store.isLoading){
                    return (
                        <Loader spinnerName='three-bounce'></Loader>
                    );
                }
                else{
                    return (
                        <div>
                            {this.state.store.movies.map(function (item) {
                                return (
                                    <div key={item.id}>
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
            }
        });
    }

}(module, require));