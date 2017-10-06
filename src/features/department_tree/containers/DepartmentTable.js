import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import { getFlatDataArray, getIsRequestAllProccess, getTreeData } from '../redux/selectors';
import * as actions from '../redux/actions';
import dialog from '../../dialogs';
import { dialogTypes } from '../constants';
import { CommonTable } from '../../../components';
import { DepartmentTableActions } from '../components';

const columns = [{ name: 'title', title: 'Название' }];
const filters = [];
const columnOrder = ['title'];

@connect(
  createStructuredSelector({
    flatData: getFlatDataArray,
    treeData: getTreeData,
    isRequestAllProccess: getIsRequestAllProccess,
  }),
  dispatch => ({
    departmentActions: bindActionCreators({ ...actions }, dispatch),
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  }),
)
class DepartmentTable extends Component {
  handleRemove = ({ path, id, title }) => {
    const { dialogActions, departmentActions } = this.props;
    dialogActions.show(dialog.constants.dialogTypes.CONFIRMATION_DIALOG, {
      confirmText: `Вы действительно хотите удалить подразделение "${title}" ? Дочерние подразделения также будут удалены.`,
      successAction: () => {
        departmentActions.removeNodeRequest(path, id);
      },
    });
  };
  handleEdit = node => this.props.dialogActions.show(dialogTypes.EDIT_DEPARTMENT_DIALOG, node);
  handleAdd = () => this.props.dialogActions.show(dialogTypes.ADD_DEPARTMENT_DIALOG);
  renderDetail = ({ row }) => (
    <div>Подробная информация о подразделении &quot;{row.title}&quot;</div>
  );
  renderActions = row => (
    <DepartmentTableActions
      row={row}
      handleRemove={this.handleRemove}
      handleEdit={this.handleEdit}
    />
  );

  render() {
    const { classes, flatData } = this.props;
    return (
      <Paper className={classes.paper}>
        <CommonTable
          showActions
          tableData={flatData}
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

const wrappedDepartmentTable = withStyles(styles)(DepartmentTable);
export { wrappedDepartmentTable as DepartmentTable };
