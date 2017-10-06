import { batchActions } from 'redux-batched-actions';
import sampleCombine from 'xstream/extra/sampleCombine';
import xs from 'xstream';
import { getTreeFromFlatData } from 'react-sortable-tree';
import R from 'ramda';
import * as t from '../redux/actionTypes';
import * as actions from '../redux/actions';
import snackbar from '../../snackbar';
import { getHttpSourceEventStream } from '../../../common/streamHelpers';
import * as selectors from '../redux/selectors';
import { getError } from '../../../helpers/ajax-helper';
import { flatFromTree, treeFromFlat } from '../../../helpers/tree-helper';
import positions from '../../position_tree';

export const cycles = {
  requestAll: sources => {
    const category = 'all_tree_nodes';
    const request$ = sources.ACTION
      .filter(action => action.type === t.REQUEST_ALL)
      .map(action => action.payload)
      .map(reqData => ({
        url: reqData.requestUrl,
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        category,
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось получить подразделения',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return batchActions([
          snackbar.actions.showSnackbar(error.message),
          { type: t.END_REQUEST_ALL },
        ]);
      }

      const { body: { data } } = response;

      const treeData = getTreeFromFlatData({
        rootKey: null,
        getKey: node => node.id,
        getParentKey: node => node.parent_id,
        flatData: data,
      });
      if (treeData[0]) {
        // развернем первый узел
        treeData[0].expanded = true;
      }

      const flatData = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

      return batchActions([
        actions.addTreeData(treeData),
        actions.addFlatData(flatData),
        { type: t.END_REQUEST_ALL },
      ]);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  addDepartmentNodeRequest: sources => {
    const category = 'add_department';
    const departmentState$ = sources.STATE.map(state => state);
    const request$ = sources.ACTION
      .filter(action => action.type === t.ADD_NODE_REQUEST)
      .map(action => action.payload)
      .map(reqData => ({
        url: reqData.requestUrl,
        category,
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        send: {
          department: reqData.department,
        },
        reqData,
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    )
      .compose(sampleCombine(departmentState$))
      .map(([response, state]) => {
        const error = getError(response);
        if (error) {
          return snackbar.actions.showSnackbar(error.message);
        }

        const { body: { data } } = response;

        const flatTree = flatFromTree(selectors.getTreeData(state));
        const extendedFlatTree = [...flatTree, { node: data }];

        const newFlatData = extendedFlatTree.reduce((acc, item) => {
          const node = item.node;
          acc[node.id] = node;
          return acc;
        }, {});

        const newTreeData = treeFromFlat(Object.values(newFlatData));

        return xs.of(
          positions.actions.requestAll(), // TODO реализовать обновление на клиенте
          batchActions([
            actions.addNode(newTreeData, newFlatData),
            snackbar.actions.showSnackbar(`Подразделение ${data.title} создано`),
          ]),
        );
      })
      .flatten();

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  removeDepartmentNodeRequest: sources => {
    const category = 'remove_department';
    const departmentState$ = sources.STATE.map(state => state);
    const request$ = sources.ACTION
      .filter(action => action.type === t.REMOVE_NODE_REQUEST)
      .map(action => action.payload)
      .map(reqData => ({
        url: reqData.requestUrl,
        category,
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        reqData,
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    )
      .compose(sampleCombine(departmentState$))
      .map(([response, state]) => {
        const error = getError(response);
        if (error) {
          return snackbar.actions.showSnackbar(error.message);
        }

        const { request: { reqData: { nodePath, nodeId } } } = response;

        const flatTree = flatFromTree(selectors.getTreeData(state));
        const regex = new RegExp(`^${nodePath}`);
        const pred = R.where({ parent_path: R.test(regex) });

        const newFlatTree = flatTree.reduce((acc, elemFull) => {
          const node = { ...elemFull.node, children: undefined };
          if (node.id !== nodeId && !pred(node)) {
            acc[node.id] = node;
          }
          return acc;
        }, {});

        const newTreeData = treeFromFlat(Object.values(newFlatTree));
        return xs.of(
          positions.actions.requestAll(), // TODO реализовать обновление на клиенте
          batchActions([
            actions.removeNode(newTreeData, newFlatTree),
            snackbar.actions.showSnackbar(`Подразделение удалено`),
          ]),
        );
      })
      .flatten();

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  editDepartmentNodeRequest: sources => {
    const category = 'edit_department';
    const departmentState$ = sources.STATE.map(state => state);
    const request$ = sources.ACTION
      .filter(action => action.type === t.EDIT_NODE_REQUEST)
      .map(action => action.payload)
      .map(reqData => ({
        url: reqData.requestUrl,
        category,
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        send: {
          department: reqData.editedAttrs,
        },
        reqData,
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    )
      .compose(sampleCombine(departmentState$))
      .map(([response, state]) => {
        const error = getError(response);
        if (error) {
          return snackbar.actions.showSnackbar(error.message);
        }

        const { body: { data }, request: { reqData: { nodeInfo } } } = response;

        const regex = new RegExp(`^${nodeInfo.path}`);
        const pred = R.where({ parent_path: R.test(regex) });

        const flatTree = flatFromTree(selectors.getTreeData(state));

        const newFlatTree = flatTree.reduce((acc, elemFull) => {
          let elem = { ...elemFull.node, children: undefined };
          if (elem.id === data.id) {
            elem = { ...elem, ...data };
          }
          if (pred(elem)) {
            elem = {
              ...elem,
              path: R.replace(nodeInfo.path, data.path, elem.path),
              parent_path: R.replace(nodeInfo.parent_path, data.parent_path, elem.parent_path),
            };
          }
          acc[elem.id] = elem;
          return acc;
        }, {});

        const newTreeData = treeFromFlat(Object.values(newFlatTree));

        return xs.of(
          positions.actions.requestAll(), // TODO реализовать обновление на клиенте
          batchActions([
            actions.editNode(newTreeData, newFlatTree),
            snackbar.actions.showSnackbar(`Подразделение ${data.title} отредактировано`),
          ]),
        );
      })
      .flatten();

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },
};
