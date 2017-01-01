import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { fromJS } from 'immutable';
// 我們的 routing 放置在 common 資料夾中的 routes
import routes from '../common/routes';
import configureStore from '../common/store/configureStore'
//import { checkAuth } from '../common/actions';

// 將 server side 傳過來的 initialState 給 rehydration（覆水）
// get initial state from server side
const initialState = window.__PRELOADED_STATE__;

// 將 initialState 傳給 configureStore 函數創建出 store 並傳給 Provider
// use initial state to create store and pass to provider
const store = configureStore(fromJS(initialState));
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
