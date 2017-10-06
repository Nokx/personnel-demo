/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { AdminMenuGroup, CommonMenuGroup } from './app_menu/menu_groups';
import EmployeeInfo from './app_menu/EmployeeInfo';
import ToolbarWidgets from './ToolbarWidgets';
import auth from '../../../auth/';

const { getUserFullName } = auth.selectors;

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#3e566d',
    color: 'rgb(223, 228, 237)',
    boxShadow: 'none',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    color: 'rgb(223, 228, 237)',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'rgb(47,64,80)',
    color: '#a7b1c2',
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  closeDrawlerButton: {
    color: 'rgb(223, 228, 237)',
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 8px',
    backgroundColor: 'rgb(38,56,70)',
    ...theme.mixins.toolbar,
  },
});

class MediumAppToolbar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, selectedMenuIndex, handleMenuClick, handleLogOut, currentUser } = this.props;

    return [
      <AppBar
        key="medium-app-bar"
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.state.open}>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <ToolbarWidgets handleLogOut={handleLogOut} />
        </Toolbar>
      </AppBar>,
      <Drawer
        key="medium-drawer"
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <EmployeeInfo
              employeeName={`${getUserFullName(currentUser)}`}
              employeePosition="Руководитель"
              employeeAvatar="http://i.pravatar.cc/70?img=60"
              visible={this.state.open}
            />
            <IconButton className={classes.closeDrawlerButton} onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />
          <CommonMenuGroup
            handleMenuClick={handleMenuClick}
            selectedMenuIndex={selectedMenuIndex}
          />
          <Divider />
          <AdminMenuGroup
            handleMenuClick={handleMenuClick}
            selectedMenuIndex={selectedMenuIndex}
            showSubheader={this.state.open}
          />
        </div>
      </Drawer>,
    ];
  }
}

const wrapperMediumAppToolbar = withStyles(styles)(MediumAppToolbar);

export { wrapperMediumAppToolbar as MediumAppToolbar };
