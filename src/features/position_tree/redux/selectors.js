import { createSelector } from 'reselect';
import { map as sortableTreeMap } from 'react-sortable-tree';
import R from 'ramda';
import { NAME } from '../constants';
import department from '../../department_tree';

export const getTreeData = state => state[NAME].treeData;
export const getFlatData = state => state[NAME].flatData;
export const getSnackbar = state => state[NAME].snackbar;
export const getAddNodeRequests = state => state[NAME].addNodeRequests;
export const getRemoveNodeRequests = state => state[NAME].removeNodeRequests;
export const getEditNodeRequests = state => state[NAME].editNodeRequests;
export const getIsRequestAllProccess = state => state[NAME].request_all;
export const getFlatDataArray = state => Object.values(state[NAME].flatData);
export const getPositionCount = state => Object.values(state[NAME].flatData).length;
const getCurrentNodeId = (state, props) => props.id;

export const getPositionTree = createSelector(
  [getTreeData, department.selectors.getFlatData],
  (treeData, departmentFlatData) =>
    sortableTreeMap({
      treeData,
      callback: ({ node }) => {
        if (!node.id) {
          return { ...node };
        }
        return { ...node, subtitle: departmentFlatData[node.department_id].title };
      },
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: false,
    }),
);

export const makeEditSelectedOptions = () =>
  createSelector([getFlatData, getCurrentNodeId], (options, id) =>
    Object.values(R.omit([id.toString()], options)),
  );
