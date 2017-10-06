import { SELECT_MENU_ITEM } from './actionTypes';

const defaultState = {
  selectedMenuIndex: undefined,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SELECT_MENU_ITEM:
      return { ...state, selectedMenuIndex: action.payload };
    default:
      return state;
  }
}
