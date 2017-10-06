import React from 'react';
import AppMenu from '../AppMenu';
import AppMenuItem from '../AppMenuItem';
import menuConfig from '../menuConfig';

const CommonMenuGroup = ({ handleMenuClick, selectedMenuIndex }) => (
  <AppMenu>
    <AppMenuItem
      handleClick={handleMenuClick}
      selectedMenuIndex={selectedMenuIndex}
      menuUtemData={menuConfig.main}
    />
    <AppMenuItem
      handleClick={handleMenuClick}
      selectedMenuIndex={selectedMenuIndex}
      menuUtemData={menuConfig.message}
    />
  </AppMenu>
);

export { CommonMenuGroup };
