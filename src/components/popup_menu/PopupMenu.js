import React, { Component } from 'react';
import Menu, { MenuList } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { withStyles } from 'material-ui/styles';

class PopupMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, children } = this.props;
    const { anchorEl, open } = this.state;
    return (
      <div>
        <IconButton aria-label="More" aria-haspopup="true" onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onRequestClose={this.handleRequestClose}>
          <MenuList className={classes.menuList} onClick={this.handleRequestClose}>
            {children}
          </MenuList>
        </Menu>
      </div>
    );
  }
}

const styles = () => ({
  menuList: {
    outline: 'none',
  },
});

export default withStyles(styles)(PopupMenu);
