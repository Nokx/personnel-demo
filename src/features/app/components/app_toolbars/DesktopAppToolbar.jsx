// @flow weak

import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import { AdminMenuGroup, CommonMenuGroup } from './app_menu/menu_groups';
import EmployeeInfo from './app_menu/EmployeeInfo';
import ToolbarWidgets from './ToolbarWidgets';
import auth from '../../../auth/';

const { getUserFullName } = auth.selectors;

const drawerWidth = 240;

const styles = () => ({
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    order: 1,
    backgroundColor: '#3e566d',
    color: 'rgb(223, 228, 237)',
    boxShadow: 'none',
  },
  drawerHeader: {
    paddingLeft: 10,
    backgroundColor: 'rgb(38,56,70)',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    backgroundColor: 'rgb(47,64,80)',
    color: '#a7b1c2',
  },
});

function DesktopAppToolbar(props) {
  const { classes, selectedMenuIndex, handleMenuClick, handleLogOut, currentUser } = props;

  return [
    <AppBar key="desktop-app-bar" className={classes.appBar}>
      <Toolbar>
        <ToolbarWidgets handleLogOut={handleLogOut} />
      </Toolbar>
    </AppBar>,
    <Drawer
      key="desktop-drawler"
      type="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <EmployeeInfo
          employeeName={`${getUserFullName(currentUser)}`}
          employeePosition="Руководитель"
          employeeAvatar="http://i.pravatar.cc/70?img=60"
        />
      </div>
      <Divider />
      <CommonMenuGroup handleMenuClick={handleMenuClick} selectedMenuIndex={selectedMenuIndex} />
      <Divider />
      <AdminMenuGroup handleMenuClick={handleMenuClick} selectedMenuIndex={selectedMenuIndex} />
    </Drawer>,
  ];
}

const wrapperDesktopAppToolbar = withStyles(styles)(DesktopAppToolbar);

export { wrapperDesktopAppToolbar as DesktopAppToolbar };
