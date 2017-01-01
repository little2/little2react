import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';

import {
  INPUT_INSTANTPW,
  LOGIN_INSTANT,
  STOP_INPUT_SHAKE,
  START_INPUT_SHAKE,
} from '../constants/actionTypes';



export const inputInstantPW = createAction('INPUT_INSTANTPW');
export const loginInstant = createAction('LOGIN_INSTANT', WebAPI.loginInstant);
export const stopInputShake = createAction('STOP_INPUT_SHAKE');
export const startInputShake = createAction('START_INPUT_SHAKE');
