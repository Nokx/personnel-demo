import React from 'react';
import { TableCell } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Create';
import { withStyles } from 'material-ui/styles';

const TableActions = ({ classes, allowDelete, onRemoveClick, onEditClick }) => (
  <TableCell className={classes.cell}>
    <IconButton className={classes.editButton} aria-label="Delete" onClick={onEditClick}>
      <EditIcon />
    </IconButton>
    {allowDelete && (
      <IconButton className={classes.deleteButton} aria-label="Delete" onClick={onRemoveClick}>
        <DeleteIcon />
      </IconButton>
    )}
  </TableCell>
);

const styles = theme => ({
  cell: {
    width: '100%',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  deleteButton: {
    color: '#ff7f50',
  },
  editButton: {
    color: '#9E9E9E',
  },
});

const wrappedTableActions = withStyles(styles)(TableActions);
export { wrappedTableActions as TableActions };
