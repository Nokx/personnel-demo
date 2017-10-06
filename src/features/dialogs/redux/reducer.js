import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import * as types from './actionTypes';

const initialState = {
  dialogs: [],
  dialogsById: {},
};

export default function dialog(state = initialState, action) {
  switch (action.type) {
    case types.SHOW: {
      const newId = uniqueId('dlg_');
      return {
        ...state,
        dialogs: state.dialogs.concat(newId),
        dialogsById: {
          ...state.dialogsById,
          [newId]: {
            id: newId,
            dialogType: action.dialogType,
            dialogProps: action.dialogProps,
          },
        },
      };
    }
    case types.UPDATE: {
      const newDialogsById = { ...state.dialogsById };
      if (newDialogsById[action.id]) {
        newDialogsById[action.id].dialogProps = action.dialogProps;
      }
      return {
        ...state,
        dialogs: [...state.dialogs],
        dialogsById: newDialogsById,
      };
    }
    case types.HIDE:
      return {
        ...state,
        dialogs: state.dialogs.filter(id => id !== action.id),
        dialogsById: omit(state.dialogsById, action.id),
      };
    default:
      return state;
  }
}
