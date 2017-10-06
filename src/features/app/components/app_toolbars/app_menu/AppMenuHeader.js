import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = () => ({
  drawerHeader: {
    padding: '20px',
    backgroundColor: 'rgb(38,56,70)',
  },
  avatar: {
    margin: 5,
  },
  employeeName: {
    color: '#DFE4ED',
  },
  employeePosition: {
    color: '#8095a8',
  },
});

const AppMenuHeader = ({ classes, employeeName, employeePosition, employeeAvatar }) => (
  <div className={classes.drawerHeader}>
    <Avatar src={employeeAvatar} size={60} className={classes.avatar} />
    <div className={classes.employeeName}>
      <strong>{employeeName}</strong>
    </div>
    <div className={classes.employeePosition}>{employeePosition}</div>
  </div>
);

export default withStyles(styles)(AppMenuHeader);
