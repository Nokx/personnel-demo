import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import { getFlatDataArray, getIsRequestAllProccess, getPositionTree } from '../redux/selectors';
import * as actions from '../redux/actions';
import dialog from '../../dialogs';
import { dialogTypes } from '../constants';
import { CommonTable } from '../../../components';
import { PositionTableActions } from '../components';

const columns = [{ name: 'title', title: 'Название' }];
const filters = [];
const columnOrder = ['title'];

@connect(
  createStructuredSelector({
    flatData: getFlatDataArray,
    treeData: getPositionTree,
    isRequestAllProccess: getIsRequestAllProccess,
  }),
  dispatch => ({
    positionActions: bindActionCreators({ ...actions }, dispatch),
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  }),
)
class PositionTable extends Component {
  handleRemove = ({ path, id, title }) => {
    const { dialogActions, positionActions } = this.props;
    dialogActions.show(dialog.constants.dialogTypes.CONFIRMATION_DIALOG, {
      confirmText: `Вы действительно хотите удалить должность "${title}" ? Дочерние должности также будут удалены.`,
      successAction: () => {
        positionActions.removeNodeRequest(path, id);
      },
    });
  };
  handleEdit = node => this.props.dialogActions.show(dialogTypes.EDIT_POSITION_DIALOG, node);
  handleAdd = () => this.props.dialogActions.show(dialogTypes.ADD_POSITION_DIALOG);
  renderDetail = ({ row }) => <div>Подробная информация о должности &quot;{row.title}&quot;</div>;
  renderActions = row => (
    <PositionTableActions row={row} handleRemove={this.handleRemove} handleEdit={this.handleEdit} />
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

const wrappedPositionTable = withStyles(styles)(PositionTable);
export { wrappedPositionTable as PositionTable };
