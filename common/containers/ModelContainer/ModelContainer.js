import React from 'react';
import { connect } from 'react-redux';
import Model from '../../components/Model';


const mapStateToProps = function(state) {  // 通常会省略第二个参数

  return {
    // 從 store 取得 todo state
    recipes: state.getIn(['recipe', 'recipes']),
  }
}



export default connect(
  mapStateToProps,
  (dispatch) => ({
  //  _onColumnResizeEndCallback : () => (alert('text')),
  })
)(Model);
