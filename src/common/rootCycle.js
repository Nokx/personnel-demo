import { combineCycles } from 'redux-cycles';
import { cycles as departmentTree } from '../features/department_tree/cycles/cycle';
import { cycles as positionTree } from '../features/position_tree/cycles/cycle';
import { cycles as auth } from '../features/auth/cycles/cycle';

const rootCycle = combineCycles(
  auth.signIn,
  auth.getAuthUser,
  auth.signOut,
  auth.getUsers,
  auth.addUserRequest,
  auth.editUserRequest,
  auth.removeUserRequest,
  departmentTree.requestAll,
  departmentTree.addDepartmentNodeRequest,
  departmentTree.removeDepartmentNodeRequest,
  departmentTree.editDepartmentNodeRequest,
  positionTree.requestAllPositions,
  positionTree.addPositionNodeRequest,
  positionTree.removePositionNodeRequest,
  positionTree.editPositionNodeRequest,
);

export default rootCycle;
