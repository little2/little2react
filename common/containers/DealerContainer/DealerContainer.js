import React from 'react';
import { connect } from 'react-redux';
import Dealer from '../../components/Dealer';


const mapStateToProps = function(state) {  // 通常会省略第二个参数
  return {
    // 從 store 取得 todo state
    recipes: state.getIn(['recipe', 'recipes']),
  }
}


const mapDispatchToProps = function(dispatch) {
  return {
    /*
    onMount: () => (
      dispatch(getUsers(dispatch))
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
    */
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dealer);
/*
(dispatch) => ({
  onIncrement: () => (
    dispatch(incrementCount())
  ),
  onDecrement: () => (
    dispatch(decrementCount())
  ),
})
*/
