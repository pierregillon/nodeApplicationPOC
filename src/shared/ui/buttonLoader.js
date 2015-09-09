(function(require, module){
    'use strict';

    var React = require('react');
    var Button = require('react-bootstrap').Button;
    var Loader = require('./loader');
    var classnames = require('classnames');

    var ButtonLoader = React.createClass({
        propTypes : {
            isLoading : React.PropTypes.bool,
            onClick : React.PropTypes.func
        },

        render : function(){
            var classes = classnames([this.props.className], this.props.isLoading ? 'disabled' : '' );
            return (
                <Button
                    {...this.props}
                    className={classes}
                    onClick={this.doAction}>
                    {this.props.isLoading ? this.renderLoading() : this.props.children }
                 </Button>
            );
        },

        renderLoading : function(){
            return (
                <Loader
                    spinnerName='three-bounce'
                    overrideSpinnerClassName='three-bounce-white'
                    noFadeIn/>
            );
        },

        doAction : function(){
            if(!this.props.isLoading && this.props.onClick){
                this.props.onClick();
            }
        }
    });

    module.exports = ButtonLoader;
}(require, module));