
import React from 'react';
import { connect } from 'react-redux';
import LoginInstant from '../../components/LoginInstant';

import {
  inputInstantPW,
  stopInputShake,
  loginInstant
} from '../../actions';




export default connect(
  (state) => ({
    password: state.getIn(['loginInstant', 'password']),
    loginStatus: state.getIn(['loginInstant', 'loginStatus']),
    shakeFixed: state.getIn(['loginInstant', 'shakeFixed']),
    keyframe: state.getIn(['loginInstant', 'keyframe']),

  }),
  (dispatch) => ({
    onClickKeyboardNumber: (e) => {
      var ev = e || window.event;
			var clickEl = ev.element || ev.target;
			var value = clickEl.textContent || clickEl.innerText;
			if(clickEl.tagName.toLocaleLowerCase() === 'td'){
        dispatch(inputInstantPW({key:'currentInput',value:value}));
        let instantPasswordLength=document.getElementById('instantPassword').value.length;
        if(instantPasswordLength==3)
        {
          let password=document.getElementById('instantPassword').value+value;
          dispatch(loginInstant(dispatch,password));
        }
			}
    },
  })
)(LoginInstant);
