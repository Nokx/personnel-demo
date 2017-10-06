import React from 'react';
import List, { ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  menuList: {
    flexGrow: 0,
  },
  menuSubHeader: {
    color: '#8095a8',
    fontSize: '12px',
  },
});

const AppMenu = ({ classes, children, subheader }) => (
  <List
    classes={{
      root: classes.menuList,
    }}
  >
    <div>
      {subheader && <ListSubheader className={classes.menuSubHeader}>{subheader}</ListSubheader>}
      {children}
    </div>
  </List>
);

export default withStyles(styles)(AppMenu);
