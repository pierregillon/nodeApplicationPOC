(function(module, require){
    'use strict';
    module.exports = TodoItem;

    var React = require('react');
    var Button = require('react-bootstrap').Button;
    var Modal = require('react-bootstrap').Modal;
    var ButtonLoader = require('../ui/buttonLoader');

    function TodoItem(todoStore) {
        return React.createClass({
            getInitialState : function(){
                return buildState(false);
            },
            render:function(){
                return (
                    <tr>
                        <td> {this.props.data.value} </td>
                        <td width={120}>
                            <ButtonLoader
                                isLoading={this.state.isRemoving}
                                loadingText='Removing ...'
                                bsStyle='danger'
                                onClick={this.openConfirmationPopup}>Remove</ButtonLoader>

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
                this.setState(buildState(true));
            },
            closeConfirmationPopup : function(){
                this.setState(buildState(false));
            }
        });

        function buildState(showModal){
            return {
                showModal : showModal,
                isRemoving : todoStore.isRemovingItem
            }
        }
    }
}(module, require));