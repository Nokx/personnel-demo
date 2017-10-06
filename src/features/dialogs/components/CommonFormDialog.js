import React from 'react';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const CommonFormDialog = ({ classes, children, formTitle, handleClose, handleSave }) => (
  <Dialog
    ignoreBackdropClick
    ignoreEscapeKeyUp
    open
    classes={{
      paper: classes.paper,
    }}
  >
    <DialogTitle>{formTitle}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button color="primary" onClick={handleClose}>
        Отмена
      </Button>,
      <Button color="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </DialogActions>
  </Dialog>
);

const styles = () => ({
  paper: {
    width: '80%',
    maxHeight: 500,
  },
});

const wrappedAddDepartmentDialog = withStyles(styles)(CommonFormDialog);

export { wrappedAddDepartmentDialog as CommonFormDialog };
