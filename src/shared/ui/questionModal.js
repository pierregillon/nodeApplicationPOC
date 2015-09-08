(function(require, module){
    'use strict';

    var React = require('react');
    var Button = require('react-bootstrap').Button;
    var Modal = require('react-bootstrap').Modal;

    var QuestionModal = React.createClass({
        propTypes : {
            show : React.PropTypes.bool,
            title : React.PropTypes.string,
            content : React.PropTypes.string,
            onYesClick : React.PropTypes.func,
            onNoClick : React.PropTypes.func,
            onCancelClick : React.PropTypes.func,
        },

        render : function(){
            return (
                <Modal show={this.props.show} onHide={this.props.onCancelClick}>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.content}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onNoClick}>No</Button>
                        <Button bsStyle='primary' onClick={this.props.onYesClick}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    });

    module.exports = QuestionModal;
}(require, module));




