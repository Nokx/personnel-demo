import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import dialog from '../../dialogs';
import { AddPositionForm } from '../components';
import * as importedPositionActions from '../redux/actions';
import { getFlatDataArray } from '../redux/selectors';

@connect(
  (state, ownProps) => ({
    dlgProps: ownProps,
    positions: getFlatDataArray(state),
  }),
  dispatch => ({
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
    positionActions: bindActionCreators({ ...importedPositionActions }, dispatch),
    reduxForm: bindActionCreators({ submit }, dispatch),
  }),
)
class AddPositionDialog extends Component {
  state = {
    initialValues: {},
    disabledFields: [],
  };

  componentWillMount() {
    const { dlgProps: { parentNodeId } } = this.props;
    const state = {
      initialValues: { parent_id: parentNodeId },
    };
    if (parentNodeId) {
      state.disabledFields = ['parent_id'];
    }
    this.setState(state);
  }

  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleSubmit = values => {
    const { dialogId, dialogActions, positionActions } = this.props;
    positionActions.addNodeRequest(values);
    dialogActions.hide(dialogId);
  };

  handleCreate = () => {
    this.props.reduxForm.submit('add_position');
  };

  render() {
    const { initialValues, disabledFields } = this.state;

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        open
        classes={{
          paper: this.props.classes.paper,
        }}
      >
        <DialogTitle>Создать должность</DialogTitle>
        <DialogContent>
          <AddPositionForm
            onSubmit={this.handleSubmit}
            positions={this.props.positions}
            initialValues={initialValues}
            disabledFields={disabledFields}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Отмена
          </Button>,
          <Button color="primary" onClick={this.handleCreate}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = () => ({
  paper: {
    width: '80%',
    minHeight: 500,
  },
});

const wrappedAddPositionDialog = withStyles(styles)(AddPositionDialog);

export { wrappedAddPositionDialog as AddPositionDialog };
