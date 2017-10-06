import * as t from './actionTypes';

export function show(dialogType, dialogProps) {
  return {
    type: t.SHOW,
    dialogType,
    dialogProps,
  };
}

export function update(dialogId, dialogProps) {
  return {
    id: dialogId,
    type: t.UPDATE,
    dialogProps,
  };
}

export function hide(id) {
  return {
    type: t.HIDE,
    id,
  };
}
