import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import { createStructuredSelector } from 'reselect';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import SortableTree, { getNodeAtPath } from 'react-sortable-tree';

import { getPositionTree, getIsRequestAllProccess } from '../redux/selectors';
import * as actions from '../redux/actions';
import dialog from '../../dialogs';
import { dialogTypes } from '../constants';
import PopupMenu from '../../../components/popup_menu/PopupMenu';
import PopupMenuItem from '../../../components/popup_menu/PopupMenuItem';
import department from '../../department_tree';

const {
  getFlatDataArray: getDepartmentData,
  getIsRequestAllProccess: isDepartmentRequestActive,
} = department.selectors;

@connect(
  createStructuredSelector({
    treeData: getPositionTree,
    isRequestAllProccess: getIsRequestAllProccess,
    departmentData: getDepartmentData,
    isDepartmentRequestActive,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch),
    dialogActions: bindActionCreators({ ...dialog.actions }, dispatch),
    departmentActions: bindActionCreators({ ...department.actions }, dispatch),
  }),
)
class PositionTree extends Component {
  componentWillMount() {
    const { departmentData, _isDepartmentRequestActive, treeData, departmentActions } = this.props;

    if (!departmentData.length && !_isDepartmentRequestActive) {
      departmentActions.requestAll();
    }
    if (!treeData.length) {
      this.requestAll();
    }
  }

  requestAll = () => {
    this.props.actions.requestAll();
  };

  generateNodeProps = rowInfo => ({
    buttons: [
      !rowInfo.node.is_department_head ? (
        <PopupMenu>
          <PopupMenuItem selected={false} onClick={() => this.handleAddClick(rowInfo)}>
            Добавить должность
          </PopupMenuItem>
          <PopupMenuItem selected={false} onClick={() => this.handleEditClick(rowInfo)}>
            Редактировать
          </PopupMenuItem>
          <PopupMenuItem selected={false} onClick={() => this.handleRemoveClick(rowInfo)}>
            Удалить
          </PopupMenuItem>
        </PopupMenu>
      ) : (
        <PopupMenu>
          <PopupMenuItem selected={false} onClick={() => this.handleAddClick(rowInfo)}>
            Добавить должность
          </PopupMenuItem>
          <PopupMenuItem selected={false} onClick={() => this.handleEditClick(rowInfo)}>
            Редактировать
          </PopupMenuItem>
        </PopupMenu>
      ),
    ],
  });

  handleRemoveClick = rowInfo => {
    this.props.dialogActions.show(dialog.constants.dialogTypes.CONFIRMATION_DIALOG, {
      confirmText: `Вы действительно хотите удалить должность "${rowInfo.node
        .title}" ? Дочерние должности также будут удалены.`,
      successAction: () => {
        const { node: { path: nodePath, id: nodeId } } = rowInfo;
        this.props.actions.removeNodeRequest(nodePath, nodeId);
      },
    });
  };

  handleAddClick = rowInfo =>
    this.props.dialogActions.show(dialogTypes.ADD_POSITION_DIALOG, {
      parentNodeId: rowInfo.node.id,
    });
  handleEditClick = rowInfo =>
    this.props.dialogActions.show(dialogTypes.EDIT_POSITION_DIALOG, rowInfo.node);
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

  canDrag = ({ node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus }) =>
    !node.is_department_head;

  canDrop = ({ nextParent }) => !!nextParent;

  render() {
    return (
      <div style={treeStyles}>
        {this.props.treeData.length ? (
          <div style={styles.fullHeight}>
            <Button raised style={styles.createDivision} onClick={this.requestAll}>
              Обновить
            </Button>
            <SortableTree
              treeData={this.props.treeData}
              onChange={this.handleTreeDataChange}
              generateNodeProps={this.generateNodeProps}
              onMoveNode={this.handleMove}
              canDrag={this.canDrag}
              canDrop={this.canDrop}
            />
          </div>
        ) : !this.props.isRequestAllProccess ? (
          <p>Должности отсутствуют. Добавьте подразделения, чтобы их создать.</p>
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
  fullHeight: {
    height: '100%',
  },
};

const wrappedPositionTree = withStyles(styles)(PositionTree);

export { wrappedPositionTree as PositionTree };

const treeStyles = {
  height: 800,
};
