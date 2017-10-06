import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { responsiveStateReducer } from 'redux-responsive';
import { responsiveDrawer } from 'material-ui-responsive-drawer';
import { enableBatching } from 'redux-batched-actions';
import departmentTree from '../features/department_tree';
import positionTree from '../features/position_tree';
import auth from '../features/auth';
import dialog from '../features/dialogs';
import snackbar from '../features/snackbar';
import app from '../features/app';

const rootReducer = enableBatching(
  combineReducers({
    browser: responsiveStateReducer,
    responsiveDrawer,
    form: formReducer,
    [departmentTree.constants.NAME]: departmentTree.reducer,
    [positionTree.constants.NAME]: positionTree.reducer,
    [auth.constants.NAME]: auth.reducer,
    dialogs: dialog.reducer,
    snackbar: snackbar.reducer,
    [app.constants.NAME]: app.reducer,
  }),
);

export default function(state, action) {
  if (action.type === auth.actionTypes.SIGNOUT_USER) {
    // возвращаем все редьюсеры в состояние по-умолчанию
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
