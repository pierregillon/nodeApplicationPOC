(function(module, require){
    'use strict';
    module.exports = TodoItem;

    var React = require('react');
    var ButtonLoader = require('../ui/buttonLoader');
    var QuestionModal = require('../ui/questionModal');

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
                                bsStyle='danger'
                                onClick={this.openConfirmationPopup}>Remove</ButtonLoader>

                            <QuestionModal
                                show={this.state.showModal}
                                title='Delete of a todo item'
                                content={'Are you sure to delete the "' + this.props.data.value + '" todo item ?'}
                                onYesClick={this.removeTodoItem}
                                onNoClick={this.closeConfirmationPopup}
                                onCancelClick={this.closeConfirmationPopup} />
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