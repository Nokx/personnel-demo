import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';

const styles = () => ({
  employeeInfo: {
    padding: '20px 8px',
  },
  employeeInfoClose: {
    display: 'none',
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

const EmployeeInfo = ({
  classes,
  employeeName,
  employeePosition,
  employeeAvatar,
  visible = true,
}) => (
  <div className={classNames(classes.employeeInfo, !visible && classes.employeeInfoClose)}>
    <Avatar src={employeeAvatar} size={60} className={classes.avatar} />
    <div className={classes.employeeName}>
      <strong>{employeeName}</strong>
    </div>
    <div className={classes.employeePosition}>{employeePosition}</div>
  </div>
);

export default withStyles(styles)(EmployeeInfo);
