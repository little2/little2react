import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../../components/LoginPage';

import {
  setUser,
} from '../../actions';

export default connect(
  (state) => ({
    spinnerVisible: state.getIn(['ui', 'spinnerVisible']),
    alertVisible: state.getIn(['user', 'alertVisible']),
    alertErrorMsg: state.getIn(['user', 'alertErrorMsg']),

  }),
  (dispatch) => ({
    onClickHide: () => {
      dispatch(setUser({ key: 'alertVisible', value: false }));
      dispatch(setUser({ key: 'alertErrorMsg', value: '' }));
    },
  })
)(LoginPage);
