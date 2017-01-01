import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';

import recipe from './data/recipeReducers';
import user from './data/userReducers';
import loginInstant from './data/loginInstantReducers';
import userInfo from './data/usersReducers';


const rootReducer = combineReducers({
  ui,
  recipe,
  user,
  loginInstant,
  userInfo,

});

export default rootReducer;
