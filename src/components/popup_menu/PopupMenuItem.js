import React from 'react';
import { MenuItem } from 'material-ui/Menu';

export default ({ onClick, children }) => (
  <MenuItem selected={false} onClick={onClick}>
    {children}
  </MenuItem>
);
