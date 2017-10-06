import * as t from './actionTypes';

export const requestAll = () => {
  const requestUrl = `${apiURL}/tree/department/subtree/root/all`;
  return {
    type: t.REQUEST_ALL,
    payload: { requestUrl },
  };
};

export const addTreeData = treeData => ({
  type: t.ADD_TREEDATA,
  payload: { treeData },
});

export const addFlatData = flatData => ({
  type: t.ADD_FLATDATA,
  payload: { flatData },
});

export const addNodeRequest = values => {
  const department = { ...values, parent_id: values.parent_id || null };

  const requestUrl = `${apiURL}departments`;
  return {
    type: t.ADD_NODE_REQUEST,
    payload: { department, requestUrl },
  };
};

export const addNode = (treeData, flatData) => ({
  type: t.ADD_NODE,
  payload: { treeData, flatData },
});

export const removeNodeRequest = (nodePath, nodeId) => {
  const requestUrl = `${apiURL}tree/departments/${nodePath}`;
  return {
    type: t.REMOVE_NODE_REQUEST,
    payload: { nodePath, nodeId, requestUrl },
  };
};

export const removeNode = (treeData, flatData) => ({
  type: t.REMOVE_NODE,
  payload: { treeData, flatData },
});

export const editNodeRequest = (nodeInfo, editedAttrs) => {
  const requestUrl = `${apiURL}departments/${nodeInfo.id}`;
  return {
    type: t.EDIT_NODE_REQUEST,
    payload: { nodeInfo, editedAttrs: { ...editedAttrs }, requestUrl },
  };
};

export const editNode = (treeData, flatData) => ({
  type: t.EDIT_NODE,
  payload: { treeData, flatData },
});
