import { handleActions } from 'redux-actions';
import { UsersStore } from '../../constants/models';
import axios from 'axios';

import {
  GET_USERS,
  SET_USERS,
  ADD_USERS,
  GET_CONTRACT_LIST
} from '../../constants/actionTypes';

const usersReducers = handleActions({
  GET_USERS: (state, { payload }) => {
    return state.set('userRows',payload.rows);
  },
  GET_CONTRACT_LIST: (state, { payload }) => {
    return state.set('userRows',payload.rows);
  },
  GET_DEALER_LIST: (state, { payload }) => {
    return state.set('userRows',payload.rows);
  },





  SET_USERS: ( state, { payload } ) => {

    state.get('userRows').forEach(function(value,index){
      if(value.userId==payload.userId)
      {
        return state.get('userRows')[index]=payload.updateRow;
      }
    });
    return state;
    //return state.set('userRows',_row);

    // return state.set(
    //   'userRows',
    //   payload.data.rows
    // )
  },
  ADD_USERS: ( state,   { payload } ) => {
    state.get('userRows').push(payload.newrow);
    return state;
  },
  DEL_USERS: ( state,   { payload } ) => {
    let _dropRows=payload.dropRows;
    let _row=state.get('userRows');

    state.get('userRows').forEach(function(value,index){
      if(_dropRows.indexOf(value.userId)>=0)
      {
        _row.splice(index, 1);

      }
    });
    return state.set('userRows',_row);

  },
}, UsersStore);

export default usersReducers;
