import React from 'react';
import { connect } from 'react-redux';
import HomePage from '../../components/HomePage';

export default connect(
  (state) => ({
    isAuthorized: state.getIn(['user', 'isAuthorized']),   
  }),
  (dispatch) => ({
  })
)(HomePage);
