(function (module, require) {
    'use strict';

    var React = require('react');

    var MovieItem = function () {
        return React.createClass({
            render: function () {
                return (
                    <div className="movie">
                        <img src={this.props.item.image}></img>
                        <div className="title">{this.props.item.title}</div>
                        <div className="description">{this.props.item.description}</div>
                        <div className="rating">Rating : {this.props.item.rating}</div>
                    </div>
                )
            }
        })
    };

    module.exports = MovieItem;
})(module, require);