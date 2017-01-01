import axios from 'axios';

// 引入 uuid 當做食譜 id
//import uuid from 'uuid';

import {
  setUsers,
  authError,
} from '../actions';


export default {
  getWebContractList: (dispatch) => {
    //假数据
    var FakeObjectDataListStore = require('../../helpers/FakeObjectDataListStore');
    let recipes2= new FakeObjectDataListStore(5,"userpass").getAll();
    return {rows:recipes2};

  },


  // 取得用户列表
  getWebUsers: (dispatch) => {
    //假数据
    var FakeObjectDataListStore = require('../../helpers/FakeObjectDataListStore');
    let recipes2= new FakeObjectDataListStore(5,"userpass").getAll();
    return {rows:recipes2};



    /*
    axios.get('/api/users')
    .then((response) => {
        dispatch(setUsers( { data : response.data } ));

    })
    .catch(function (error) {

    });
    */
  },

  addWebUsers: (dispatch,RowsObj) => {
  //  console.log("这里要新增列");
  //  console.log(RowsObj);
    return {newrow:RowsObj};

    /*
    axios.post('/api/createUser', rowobj)
    .then((response) => {
      if(response.data.success === false) {
      } else {
      }
    })
    .catch(function (error) {});
    */
  },
  setWebUsers: (dispatch,updateRow) => {
  //  console.log("这里要新增列");
  // console.log(updateRow);
    return { updateRow : updateRow , userId: updateRow.userId };

    /*
    axios.post('/api/createUser', rowobj)
    .then((response) => {
      if(response.data.success === false) {
      } else {
      }
    })
    .catch(function (error) {});
    */
  },
  delWebUsers: (dispatch,dropRows) => {
  //  console.log("这里要新增列");
  //  console.log(RowsObj);
    return {dropRows:dropRows};

    /*
    axios.post('/api/createUser', rowobj)
    .then((response) => {
      if(response.data.success === false) {
      } else {
      }
    })
    .catch(function (error) {});
    */
  }

};
