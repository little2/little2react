import React from 'react';
import { connect } from 'react-redux';

import {
  getUsers,
  addUsers,
  delUsers,
  setUsers,
  getContractList,
  getDealerList,
  getInventoryList
} from '../../actions';

const mapStateToProps = function(state) {  // 通常会省略第二个参数
  return {
    dataRows: state.getIn(['userInfo', 'userRows']),
    inventoryRows: state.getIn(['inventory','inventoryRows']),
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onGetRow: () => (
      dispatch(getDealerList(dispatch))
      //getContractList
    ),
    onGetInventory: () => (
      dispatch(getInventoryList(dispatch))
    ),
    onAddRow: (RowsObj) => {(
      dispatch(addUsers(dispatch,RowsObj))
      //console.log("onAfterTableComplete")
    )},
    onSetRow: (updateRow) => (
     dispatch(setUsers(dispatch,updateRow))
     //dispatch(getUsers(dispatch))
      //console.log("onAfterTableComplete")
    ),
    onDelRow: (dropRowKeys) => (
      dispatch(delUsers(dispatch,dropRowKeys))
      //console.log("onAfterTableComplete")
    )
  }
}

import MobileVehicleInventory from '../../components/MobileVehicleInventory';
export default connect(mapStateToProps,mapDispatchToProps)(MobileVehicleInventory);
