import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import dialog from '../../dialogs';
import { AddDepartmentForm } from '../components';
import * as importedDepartmentActions from '../redux/actions';
import { getFlatDataArray } from '../redux/selectors';

const { CommonFormDialog } = dialog.components;

@connect(
  (state, ownProps) => ({
    dlgProps: ownProps,
    departments: getFlatDataArray(state),
  }),
  dispatch => ({
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
    departmentActions: bindActionCreators({ ...importedDepartmentActions }, dispatch),
    reduxForm: bindActionCreators({ submit }, dispatch),
  }),
)
class AddDepartmentDialog extends Component {
  state = {
    initialValues: {},
    disabledFields: [],
  };

  componentWillMount() {
    const { dlgProps: { parentNodeId }, departments } = this.props;
    const state = {
      initialValues: { parent_id: parentNodeId },
    };
    if (parentNodeId) {
      // если создаем из дерева и уже знаем родителя
      state.disabledFields = ['parent_id'];
    }
    if (!departments.length) {
      // если должности еще не заведены
      state.hiddenFields = ['parent_id'];
    }
    this.setState(state);
  }

  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleSubmit = values => {
    const { dialogId, dialogActions, departmentActions } = this.props;
    departmentActions.addNodeRequest(values);
    dialogActions.hide(dialogId);
  };

  handleCreate = () => {
    this.props.reduxForm.submit('add_department');
  };

  render() {
    const { initialValues, disabledFields, hiddenFields } = this.state;
    return (
      <CommonFormDialog
        formTitle="Создать подразделение"
        handleClose={this.handleClose}
        handleSave={this.handleCreate}
      >
        <AddDepartmentForm
          onSubmit={this.handleSubmit}
          initialValues={initialValues}
          departments={this.props.departments}
          disabledFields={disabledFields}
          hiddenFields={hiddenFields}
        />
      </CommonFormDialog>
    );
  }
}

const styles = () => ({
  paper: {
    width: '80%',
    maxHeight: 500,
  },
});

const wrappedAddDepartmentDialog = withStyles(styles)(AddDepartmentDialog);

export { wrappedAddDepartmentDialog as AddDepartmentDialog };
