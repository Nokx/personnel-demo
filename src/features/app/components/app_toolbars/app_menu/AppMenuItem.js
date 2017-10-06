import React from 'react';
import SimpleAppMenuItem from './SimpleAppMenuItem';

const AppMenuItem = ({ handleClick, selectedMenuIndex, menuUtemData }) => (
  <SimpleAppMenuItem
    handleClick={handleClick}
    icon={menuUtemData.icon}
    title={menuUtemData.title}
    selected={selectedMenuIndex === menuUtemData.code}
    menuIndex={menuUtemData.code}
  />
);

export default AppMenuItem;
