import React from 'react';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import MailIcon from 'material-ui-icons/Mail';
import Button from 'material-ui/Button';

const styles = () => ({
  widget: {
    marginRight: 5,
    color: 'rgb(223, 228, 237)',
  },
  colorPrimary: {
    backgroundColor: '#009688',
  },
});

const ToolbarWidgets = ({ classes, handleLogOut }) => [
  <div key="toolbar-widgets-1" style={{ flex: 1 }} />,
  <Badge
    className={classes.widget}
    key="toolbar-widgets-2"
    badgeContent={5}
    color="primary"
    classes={{
      colorPrimary: classes.colorPrimary,
    }}
  >
    <MailIcon />
  </Badge>,
  <Button className={classes.widget} key="toolbar-widgets-3" color="primary" onClick={handleLogOut}>
    Выйти
  </Button>,
];

export default withStyles(styles)(ToolbarWidgets);
