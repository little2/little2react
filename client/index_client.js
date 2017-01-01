import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute ,browserHistory, Redirect} from 'react-router';

import routes from '../common/routes';
//import store from './store';
import configureStore from '../common/store/configureStore';
import Immutable, { fromJS } from 'immutable';

//var FakeObjectDataListStore = require('../helpers/FakeObjectDataListStore');
//let recipes= new FakeObjectDataListStore(15,"dealer").getAll();
import VendorContainer from '../common/containers/VendorContainer';



let recipes;

const initialState = fromJS({
  recipe: {
    recipes: recipes,
    recipe: {
      id: '',
      name: '',
      description: '',
      imagePath: '',
    }
  },
  user: {
    isAuthorized: '',
    isEdit: false,
  },
  ui: {
    spinnerVisible: false,
    isEdit: false,
  },
  userInfo: {
    userRows: [],
    userId: 0,
    dealerId: '',
    account: '',
    password: '',
    userName: '',
    userPosition: '',
    userPower: 0,
    lastUpdateDate: '',
  }
});
// 建立一個 redux store / server side 渲染頁面
// Create a new Redux store instance
const store = configureStore(initialState);



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} >

    </Router>
  </Provider>,
  document.getElementById('app')
);



/*
var input1 = document.getElementById('text1');
input1.addEventListener('focus',function(e){
document.activeElement.blur();
/*some code /
}, true);

input1.onclick = function(){
  new KeyBoard(input1);
};
*/
