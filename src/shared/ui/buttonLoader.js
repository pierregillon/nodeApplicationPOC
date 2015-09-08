(function(require, module){
    'use strict';

    var React = require('react');
    var Button = require('react-bootstrap').Button;

    var ButtonLoader = React.createClass({
        propTypes : {
            isLoading : React.PropTypes.bool,
            loadingText : React.PropTypes.string,
            onClick : React.PropTypes.func
        },

        render : function(){
            return (
                <Button
                    {...this.props}
                    className={this.props.isLoading ? 'disabled' : '' }
                    onClick={this.doAction}>
                    {this.props.isLoading ? this.props.loadingText : this.props.children }
                 </Button>
            );
        },

        doAction : function(){
            if(this.props.isLoading === false && this.props.onClick){
                this.props.onClick();
            }
        }
    });

    module.exports = ButtonLoader;
}(require, module));