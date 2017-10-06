import * as t from './actionTypes';

const initialState = {
  treeData: [],
  flatData: {},
  requests: [],
  request_all: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.REQUEST_ALL: {
      return { ...state, request_all: true };
    }

    case t.END_REQUEST_ALL: {
      return { ...state, request_all: false };
    }

    case t.SET_ALL: {
      return { ...state, treeData: action.payload.treeData };
    }

    case t.ADD_TREEDATA: {
      const { treeData } = action.payload;
      return { ...state, treeData };
    }

    case t.ADD_FLATDATA: {
      const { flatData } = action.payload;
      return { ...state, flatData };
    }

    case t.ADD_NODE_REQUEST: {
      return state;
    }

    case t.ADD_NODE: {
      const { treeData, flatData } = action.payload;
      return { ...state, treeData, flatData };
    }

    case t.REMOVE_NODE_REQUEST: {
      return state;
    }

    case t.REMOVE_NODE: {
      const { treeData, flatData } = action.payload;
      return { ...state, treeData, flatData };
    }

    case t.EDIT_NODE_REQUEST: {
      return state;
    }

    case t.EDIT_NODE: {
      const { treeData, flatData } = action.payload;
      return { ...state, treeData, flatData };
    }

    default: {
      return state;
    }
  }
}
