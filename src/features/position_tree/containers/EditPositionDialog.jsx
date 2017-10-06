import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { submit } from 'redux-form';
import dialog from '../../dialogs';
import { EditPositionForm } from '../components';
import * as importedPositionActions from '../redux/actions';
import { makeEditSelectedOptions } from '../redux/selectors';

class EditPositionDialog extends Component {
  state = {
    initialValues: {},
    disabledFields: [],
    hiddenFields: [],
  };

  componentWillMount() {
    const { dlgProps: node } = this.props;
    const state = {
      initialValues: {
        parent_id: node.parent_id,
        name: node.title,
      },
    };
    if (node.is_department_head) {
      state.disabledFields = ['parent_id'];
    }
    if (!node.parent_id) {
      state.hiddenFields = ['parent_id'];
    }

    this.setState(state);
  }

  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleSubmit = values => {
    const { dlgProps: oldNode, dialogId, dialogActions, positionActions } = this.props;
    positionActions.editNodeRequest(oldNode, values);
    dialogActions.hide(dialogId);
  };

  handleUpdate = () => {
    this.props.reduxForm.submit('edit_position');
  };

  render() {
    const { classes, positions } = this.props;
    const { initialValues, disabledFields, hiddenFields } = this.state;

    return (
      <Dialog
        ignoreBackdropClick
        ignoreEscapeKeyUp
        open
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle>Редактировать подразделение</DialogTitle>
        <DialogContent>
          <EditPositionForm
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            positions={positions}
            disabledFields={disabledFields}
            hiddenFields={hiddenFields}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Отмена
          </Button>,
          <Button color="primary" onClick={this.handleUpdate}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const makeMapStateToProps = () => {
  const editSelectedOptions = makeEditSelectedOptions();
  const mapStateToProps = (state, ownProps) => ({
    dlgProps: ownProps,
    positions: editSelectedOptions(state, ownProps),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  positionActions: bindActionCreators({ ...importedPositionActions }, dispatch),
  reduxForm: bindActionCreators({ submit }, dispatch),
});

const styles = () => ({
  paper: {
    width: '80%',
    maxHeight: 500,
  },
});

const wrappedEditPositionDialog = withStyles(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(EditPositionDialog),
);

export { wrappedEditPositionDialog as EditPositionDialog };
