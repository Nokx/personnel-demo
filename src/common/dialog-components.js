import department from '../features/department_tree';
import position from '../features/position_tree';
import dialog from '../features/dialogs';
import auth from '../features/auth';

export default {
  [dialog.constants.dialogTypes.CONFIRMATION_DIALOG]: dialog.containers.ConfirmationDialog,
  [department.constants.dialogTypes.ADD_DEPARTMENT_DIALOG]:
    department.containers.AddDepartmentDialog,
  [department.constants.dialogTypes.EDIT_DEPARTMENT_DIALOG]:
    department.containers.EditDepartmentDialog,
  [position.constants.dialogTypes.ADD_POSITION_DIALOG]: position.containers.AddPositionDialog,
  [position.constants.dialogTypes.EDIT_POSITION_DIALOG]: position.containers.EditPositionDialog,
  [auth.constants.dialogTypes.USER_FORM_DIALOG]: auth.containers.UserFormDialog,
};
