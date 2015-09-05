(function(module, require){
    'use strict';
    module.exports = TodoItem;

    var React = require('react');
    var Button = require('react-bootstrap').Button;
    var Modal = require('react-bootstrap').Modal;

    function TodoItem() {
        return React.createClass({
            getInitialState : function(){
                return { showModal : false };
            },
            render:function(){
                return (
                    <tr>
                        <td> {this.props.data.value} </td>
                        <td>
                            <Button bsStyle='danger' onClick={this.openConfirmationPopup}>Remove</Button>

                            <Modal show={this.state.showModal} onHide={this.closeConfirmationPopup}>
                                <Modal.Header>
                                    <Modal.Title>Delete of a todo item</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure to delete the "{this.props.data.value}" todo item ?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.closeConfirmationPopup}>No</Button>
                                    <Button bsStyle='primary' onClick={this.removeTodoItem}>Yes</Button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                    </tr>
                );
            },
            removeTodoItem: function () {
                this.props.onRemoveRequested();
                this.closeConfirmationPopup();
            },
            openConfirmationPopup : function(){
                this.setState({showModal: true});
            },
            closeConfirmationPopup : function(){
                this.setState({showModal: false});
            }
        });
    }
}(module, require));