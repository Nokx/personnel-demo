import { actionTypes as t } from './actions';

export default function(state = { show: false, text: '' }, action) {
  switch (action.type) {
    case t.SHOW_SNACKBAR: {
      return {
        ...state,
        show: true,
        text: action.payload,
      };
    }

    case t.HIDE_SNACKBAR: {
      return {
        ...state,
        show: false,
        text: '',
      };
    }

    default: {
      return state;
    }
  }
}
