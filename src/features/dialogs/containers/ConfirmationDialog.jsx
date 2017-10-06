import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import * as actions from '../redux/actions';

class ConfirmationDialog extends Component {
  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleOk = () => {
    this.props.dlgProps.successAction();
    this.props.dialogActions.hide(this.props.dialogId);
  };

  render() {
    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth="md"
        open
        onRequestClose={this.handleClose}
      >
        <DialogContent>{this.props.dlgProps.confirmText}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Отмена
          </Button>,
          <Button color="primary" onClick={this.handleOk}>
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  dlgProps: ownProps,
});

const mapDispatchToProps = dispatch => ({
  dialogActions: bindActionCreators({ ...actions }, dispatch),
  dispatch,
});

const wrappedConfirmationDialog = connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);

export { wrappedConfirmationDialog as ConfirmationDialog };
