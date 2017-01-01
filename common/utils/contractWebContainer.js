import axios from 'axios';

// 引入 uuid 當做食譜 id
//import uuid from 'uuid';




export default {
  // 取得用户列表
  getWebContractList: (dispatch) => {
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



};
