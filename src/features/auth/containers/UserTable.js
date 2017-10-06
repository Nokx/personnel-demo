import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import { getUsersArray, getUserFullName } from '../redux/selectors';
import * as actions from '../redux/actions';
import dialog from '../../dialogs';
import { dialogTypes } from '../constants';
import { CommonTable } from '../../../components';
import { UserTableActions } from '../components';

const columns = [
  { name: 'email', title: 'Email' },
  { name: 'first_name', title: 'Имя' },
  { name: 'last_name', title: 'Фамилия' },
];
const filters = [];
const columnOrder = ['email', 'first_name', 'last_name'];

@connect(
  createStructuredSelector({
    users: getUsersArray,
  }),
  dispatch => ({
    userActions: bindActionCreators({ ...actions }, dispatch),
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  }),
)
class UserTable extends Component {
  componentWillMount() {
    this.props.userActions.loadUsersRequest();
  }

  handleRemove = user => {
    const { dialogActions, userActions } = this.props;
    dialogActions.show(dialog.constants.dialogTypes.CONFIRMATION_DIALOG, {
      confirmText: `Вы действительно хотите удалить пользователя ${getUserFullName(user)}?`,
      successAction: () => {
        userActions.removeUserRequest(user);
      },
    });
  };
  handleEdit = user =>
    this.props.dialogActions.show(dialogTypes.USER_FORM_DIALOG, { user, isEdit: true });
  handleAdd = () => this.props.dialogActions.show(dialogTypes.USER_FORM_DIALOG);
  renderDetail = ({ row }) => <div>Подробная информация о пользователе</div>;
  renderActions = row => (
    <UserTableActions row={row} handleRemove={this.handleRemove} handleEdit={this.handleEdit} />
  );

  render() {
    const { classes, users } = this.props;
    return (
      <Paper className={classes.paper}>
        <CommonTable
          showActions
          tableData={users}
          columns={columns}
          columnOrder={columnOrder}
          filters={filters}
          handleAdd={this.handleAdd}
          handleRemove={this.handleRemove}
          renderDetail={this.renderDetail}
          renderActions={this.renderActions}
        />
      </Paper>
    );
  }
}

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

const wrappedUserTable = withStyles(styles)(UserTable);
export { wrappedUserTable as UserTable };
