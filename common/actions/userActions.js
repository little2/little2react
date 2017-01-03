import { createAction } from 'redux-actions';
import WebAPI from '../utils/WebAPI';
import usersWebContainer from '../utils/usersWebContainer';


import {
  AUTH_START,
  AUTH_COMPLETE,
  AUTH_ERROR,
  START_LOGOUT,
  CHECK_AUTH,
  SET_USER,
  GET_USERS,
  SET_USERS,
  ADD_USERS,
  DEL_USERS,
  UPD_USERS,
  GET_CONTRACT_LIST,
  GET_INVENTORY_LIST
} from '../constants/actionTypes';

export const authStart = createAction('AUTH_START', WebAPI.login);
export const authComplete = createAction('AUTH_COMPLETE');
export const authError = createAction('AUTH_ERROR');
export const startLogout = createAction('START_LOGOUT', WebAPI.logout);
export const checkAuth = createAction('CHECK_AUTH');
export const setUser = createAction('SET_USER');

//專分銷
export const getDealerList = createAction('GET_DEALER_LIST', usersWebContainer.getWebDealerList);

//盤點
export const getInventoryList = createAction('GET_INVENTORY_LIST', usersWebContainer.getInventoryList);



//用戶
export const setUsers = createAction('SET_USERS', usersWebContainer.setWebUsers);
export const getUsers = createAction('GET_USERS', usersWebContainer.getWebUsers);
export const addUsers = createAction('ADD_USERS', usersWebContainer.addWebUsers);
export const delUsers = createAction('DEL_USERS', usersWebContainer.delWebUsers);

//合約
export const getContractList = createAction('GET_CONTRACT_LIST', usersWebContainer.getWebContractList);
