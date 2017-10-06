import { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';

export const getNodeKey = ({ treeIndex }) => treeIndex;

const getKey = node => node.id;
const getParentKey = node => node.parent_id;

export const flatFromTree = (treeData, ignoreCollapsed = false) =>
  getFlatDataFromTree({
    treeData,
    getNodeKey,
    ignoreCollapsed,
  });

export const treeFromFlat = (flatData, rootKey = null) =>
  getTreeFromFlatData({
    rootKey,
    getKey,
    getParentKey,
    flatData,
  });
