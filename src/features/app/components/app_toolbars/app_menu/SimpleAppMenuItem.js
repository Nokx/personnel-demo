import React, { Component } from 'react';
import classNames from 'classnames';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  menuItem: {
    '&:hover': {
      backgroundColor: '#009688',
    },
  },
  selectedMenu: {
    backgroundColor: '#273947',
    borderLeft: '3px solid #009688',
  },
  menuItemLink: {
    '& h3': {
      textDecoration: 'none',
      color: 'rgb(223, 228, 237)',
      padding: 0,
    },
  },
  menuItemIcon: {
    color: 'rgb(223, 228, 237)',
  },
});

class SimpleAppMenuItem extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.menuIndex);
  };

  render() {
    const { classes, selected, icon: Icon, title } = this.props;
    return (
      <ListItem
        button
        className={classNames(classes.menuItem, selected && classes.selectedMenu)}
        onClick={this.handleClick}
      >
        <ListItemIcon className={classes.menuItemIcon}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} className={classes.menuItemLink} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(SimpleAppMenuItem);
