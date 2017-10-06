import * as t from './actionTypes';

export const selectMenuItem = itemIndex => ({
  type: t.SELECT_MENU_ITEM,
  payload: itemIndex,
});
