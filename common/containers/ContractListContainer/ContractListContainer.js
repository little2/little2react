import React from 'react';
import { connect } from 'react-redux';

import {
  getUsers,
  addUsers,
  delUsers,
  setUsers,
  getContractList
} from '../../actions';

const mapStateToProps = function(state) {  // 通常会省略第二个参数
  return {
    dataRows: state.getIn(['userInfo', 'userRows']),
    userName: state.getIn(['userInfo','userName']),
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onGetRow: () => (
      dispatch(getContractList(dispatch))
      //getContractList
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

import ContractList from '../../components/ContractList';
export default connect(mapStateToProps,mapDispatchToProps)(ContractList);
