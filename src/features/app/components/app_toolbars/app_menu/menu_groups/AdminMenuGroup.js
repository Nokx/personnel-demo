import React from 'react';
import AppMenu from '../AppMenu';
import AppMenuItem from '../AppMenuItem';
import menuConfig from '../menuConfig';

const AdminMenuGroup = ({ handleMenuClick, selectedMenuIndex, showSubheader = true }) => (
  <AppMenu subheader={showSubheader && 'Администрирование'}>
    <AppMenuItem
      handleClick={handleMenuClick}
      selectedMenuIndex={selectedMenuIndex}
      menuUtemData={menuConfig.department}
    />
    <AppMenuItem
      handleClick={handleMenuClick}
      selectedMenuIndex={selectedMenuIndex}
      menuUtemData={menuConfig.position}
    />
    <AppMenuItem
      handleClick={handleMenuClick}
      selectedMenuIndex={selectedMenuIndex}
      menuUtemData={menuConfig.user}
    />
  </AppMenu>
);

export { AdminMenuGroup };
