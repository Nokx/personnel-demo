import MailIcon from 'material-ui-icons/Mail';
import AppsIcon from 'material-ui-icons/Apps';
import UsersIcon from 'material-ui-icons/Group';
import PositionsIcon from 'material-ui-icons/DeviceHub';
import DepartmentsIcon from 'material-ui-icons/Business';

const menuItemsData = {
  main: {
    code: 'main',
    path: '/dashbosrd',
    icon: AppsIcon,
    title: 'Главная',
  },
  message: {
    code: 'message',
    path: '/messages',
    icon: MailIcon,
    title: 'Сообщения',
  },
  department: {
    code: 'department',
    path: '/departments',
    icon: DepartmentsIcon,
    title: 'Подразделения',
  },
  position: {
    code: 'position',
    path: '/positions',
    icon: PositionsIcon,
    title: 'Должности',
  },
  user: {
    code: 'user',
    path: '/users',
    icon: UsersIcon,
    title: 'Пользователи',
  },
};

export default menuItemsData;
