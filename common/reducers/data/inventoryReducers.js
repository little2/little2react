import { handleActions } from 'redux-actions';
import { InventoryState } from '../../constants/models';
import axios from 'axios';

import {
  GET_INVENTORY_LIST
} from '../../constants/actionTypes';

const inventoryReducers = handleActions({
  GET_INVENTORY_LIST: (state, { payload }) => {
    return state.set('inventoryRows',payload.rows);
  },
}, InventoryState);

export default inventoryReducers;
