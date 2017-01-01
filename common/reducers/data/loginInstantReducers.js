import axios from 'axios';
import { handleActions } from 'redux-actions';
import { LoginInstantState } from '../../constants/models';

import {
  INPUT_INSTANTPW,
  STOP_INPUT_SHAKE
} from '../../constants/actionTypes';

const loginInstantReducers = handleActions({
  INPUT_INSTANTPW: (state, { payload }) => {
    let password=state.get('password');

    if(typeof password == "undefined")
    {
      password=payload.value;
    }
    else
    {
      password+=payload.value;
    }

    return state.set("password",password);
  },
  LOGIN_INSTANT: (state) => {
    return state.merge({
      password: ''
    });
  },
  STOP_INPUT_SHAKE: (state) => {
    return state.merge({
      loginStatus: 'success',
      shakeFixed: false,
      keyframe: 100
    });

  },
  START_INPUT_SHAKE: (state) => {
    return state.merge({
      loginStatus: 'fail',
      password: '',
      keyframe: 10,
      shakeFixed: true
    });
  }
  /*
  SET_RECIPE: (state, { payload }) => (
    state.setIn(payload.keyPath, payload.value)
  ),
  */
}, LoginInstantState);

export default loginInstantReducers;
