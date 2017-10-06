import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import dialog from '../../dialogs';
import { UserForm } from '../components';
import * as importedUserActions from '../redux/actions';
import { getUsers } from '../redux/selectors';

const { CommonFormDialog } = dialog.components;

@connect(
  (state, ownProps) => ({
    dlgProps: ownProps,
    users: getUsers(state),
  }),
  dispatch => ({
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
    userActions: bindActionCreators({ ...importedUserActions }, dispatch),
    reduxForm: bindActionCreators({ submit }, dispatch),
  }),
)
class UserFormDialog extends Component {
  state = {
    initialValues: {},
    disabledFields: [],
  };

  componentWillMount() {
    const { dlgProps: { isEdit, user } } = this.props;
    const initialValues = isEdit ? user : {};
    const state = {
      initialValues,
      formTitle: !isEdit ? 'Создать пользователя' : 'Редактировать пользователя',
    };
    if (isEdit) {
      state.disabledFields = ['email'];
      state.hiddenFields = ['password'];
    }
    this.setState(state);
  }

  handleClose = () => {
    const { dialogId, dialogActions } = this.props;
    dialogActions.hide(dialogId);
  };

  handleSubmit = values => {
    const { dialogId, dialogActions, userActions, isEdit, dlgProps } = this.props;
    const user = {
      first_name: values.first_name,
      last_name: values.last_name,
    };
    if (isEdit) {
      user.id = dlgProps.user.id;
      userActions.editUserRequest(user);
    } else {
      user.credential = {
        email: values.email,
        password: values.password,
      };
      userActions.addUserRequest(user);
    }

    dialogActions.hide(dialogId);
  };

  handleCreate = () => {
    this.props.reduxForm.submit('user_form');
  };

  render() {
    const { initialValues, disabledFields, hiddenFields, formTitle } = this.state;
    const { users } = this.props;

    return (
      <CommonFormDialog
        formTitle={formTitle}
        handleClose={this.handleClose}
        handleSave={this.handleCreate}
      >
        <UserForm
          onSubmit={this.handleSubmit}
          initialValues={initialValues}
          users={users}
          disabledFields={disabledFields}
          hiddenFields={hiddenFields}
        />
      </CommonFormDialog>
    );
  }
}

const styles = () => ({});

const wrappedAddDepartmentDialog = withStyles(styles)(UserFormDialog);

export { wrappedAddDepartmentDialog as UserFormDialog };
