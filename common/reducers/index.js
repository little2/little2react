import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';

import recipe from './data/recipeReducers';
import user from './data/userReducers';
import loginInstant from './data/loginInstantReducers';
import userInfo from './data/usersReducers';
import inventory from './data/inventoryReducers';



const rootReducer = combineReducers({
  ui,
  recipe,
  user,
  loginInstant,
  userInfo,
  inventory
});

export default rootReducer;
