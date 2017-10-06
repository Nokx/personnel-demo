import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import SortableTree, { getNodeAtPath } from 'react-sortable-tree';
import R from 'ramda';

import { getTreeData, getIsRequestAllProccess } from '../redux/selectors';
import * as actions from '../redux/actions';
import dialog from '../../dialogs';
import { dialogTypes } from '../constants';
import PopupMenu from '../../../components/popup_menu/PopupMenu';
import PopupMenuItem from '../../../components/popup_menu/PopupMenuItem';

@connect(
  createStructuredSelector({
    treeData: getTreeData,
    isRequestAllProccess: getIsRequestAllProccess,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch),
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
  }),
)
class DepartmentTree extends Component {
  componentWillMount() {
    if (!this.props.treeData.length) {
      this.props.actions.requestAll();
    }
  }

  generateNodeProps = rowInfo => ({
    buttons: [
      <PopupMenu>
        <PopupMenuItem selected={false} onClick={() => this.handleAddClick(rowInfo)}>
          Добавить подразделение
        </PopupMenuItem>
        <PopupMenuItem selected={false} onClick={() => this.handleEditClick(rowInfo)}>
          Редактировать
        </PopupMenuItem>
        <PopupMenuItem selected={false} onClick={() => this.handleRemoveClick(rowInfo)}>
          Удалить
        </PopupMenuItem>
      </PopupMenu>,
    ],
  });

  handleRemoveClick = rowInfo => {
    this.props.dialogActions.show(dialog.constants.dialogTypes.CONFIRMATION_DIALOG, {
      confirmText: `Вы действительно хотите удалить подразделение "${rowInfo.node
        .title}" ? Дочерние подразделения также будут удалены.`,
      successAction: () => {
        const { node: { path: nodePath, id: nodeId } } = rowInfo;
        this.props.actions.removeNodeRequest(nodePath, nodeId);
      },
    });
  };

  handleAddClick = rowInfo =>
    this.props.dialogActions.show(dialogTypes.ADD_DEPARTMENT_DIALOG, {
      parentNodeId: rowInfo.node ? rowInfo.node.id : undefined,
    });
  handleEditClick = rowInfo =>
    this.props.dialogActions.show(dialogTypes.EDIT_DEPARTMENT_DIALOG, rowInfo.node);
  handleTreeDataChange = treeData => this.props.actions.addTreeData(treeData);

  handleMove = ({ node, path }) => {
    const newParentPath = R.slice(0, -1, path);

    const parentNode = getNodeAtPath({
      treeData: this.props.treeData,
      path: newParentPath,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: true, // нужно обязательно true
    });

    this.props.actions.editNodeRequest(node, { parent_id: parentNode.node.id });
  };

  canDrop = ({ nextParent }) => !!nextParent;

  render() {
    return (
      <div style={treeStyles}>
        {this.props.treeData.length ? (
          <SortableTree
            treeData={this.props.treeData}
            onChange={this.handleTreeDataChange}
            generateNodeProps={this.generateNodeProps}
            onMoveNode={this.handleMove}
            canDrop={this.canDrop}
          />
        ) : !this.props.isRequestAllProccess ? (
          <Button raised style={styles.createDivision} onClick={this.handleAddClick}>
            Добавить подразделение
          </Button>
        ) : (
          <CircularProgress size={60} />
        )}
      </div>
    );
  }
}

const styles = {
  createDivision: {
    marginLeft: 20,
  },
  menuList: {
    outline: 'none',
  },
};

const wrappedDepartmentTree = withStyles(styles)(DepartmentTree);

export { wrappedDepartmentTree as DepartmentTree };

const treeStyles = {
  height: 800,
};
