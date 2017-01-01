import axios from 'axios';
import { browserHistory } from 'react-router';
// 引入 uuid 當做食譜 id
//import uuid from 'uuid';

import {
  authComplete,
  authError,
  hideSpinner,
  completeLogout,
  startInputShake,
  stopInputShake
} from '../actions';

// getCookie 函數傳入 key 回傳 value
function getCookie(keyName) {
  var name = keyName + '=';
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0)==' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

export default {
  // 呼叫後端登入 api
  login: (dispatch, email, password) => {
    //refer to /server/controll
    axios.post('/api/login', {
      email: email,
      password: password
    })
    .then((response) => {
      if(response.data.success === false) {
        dispatch(authError({errmsg:response.data.message}));
        dispatch(hideSpinner());
      //  window.location.reload();
      } else {
        if (!document.cookie.token) {
          let d = new Date();
          d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
          const expires = 'expires=' + d.toUTCString();
          document.cookie = 'token=' + response.data.token + '; ' + expires;
          dispatch(authComplete());
          dispatch(hideSpinner());
          browserHistory.push('/');
        }
      }
    })
    .catch(function (error) {
      dispatch(authError({errmsg: error}));
    });
  },

  // 呼叫後端登入 api
  loginInstant: (dispatch,password) => {
    //refer to /server/controll


  //  axios.post('/api/loginInstant', {
    axios.post('/api/loginInstant', {
      password: password
    })
    .then((response) => {
      if(response.data.success === false) {
      //  dispatch(authError({errmsg:response.data.message}));
      //  dispatch(hideSpinner());
      //  window.location.reload();
        //錯誤
         dispatch(startInputShake())
         setTimeout(() => {
           dispatch(stopInputShake())
         }, 500);

      } else {


        if (!document.cookie.token) {
          let d = new Date();
          d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
          const expires = 'expires=' + d.toUTCString();
          document.cookie = 'token=' + response.data.token + '; ' + expires;
          dispatch(authComplete());
      
          browserHistory.push('/');
        }

      }
    })
    .catch(function (error) {
      console.log(error);
    });

  },



   // 呼叫後端登出 api
  logout: (dispatch) => {
    document.cookie = 'token=; ' + 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(hideSpinner());
    browserHistory.push('/');
  },
    // 確認使用者是否登入
  checkAuth: (dispatch, token) => {
    axios.post('/api/authenticate', {
      token: token,
    })
    .then((response) => {
      if(response.data.success === false) {
        dispatch(authError());
      } else {
        dispatch(authComplete());
      }
    })
    .catch(function (error) {
      dispatch(authError());
    });
  },

  // 取得目前所有食譜
  getRecipes: () => {
    axios.get('/api/recipes')
    .then((response) => {
    })
    .catch((error) => {
    });
  },
  // 呼叫新增食譜 api，記得附加上我們存在 cookies 的 token
  addRecipe: (dispatch, name, description, imagePath) => {
    const id = uuid.v4();
    axios.post('/api/recipes?token=' + getCookie('token'), {
      id: id,
      name: name,
      description: description,
      imagePath: imagePath,
    })
    .then((response) => {
      if(response.data.success === false) {
        dispatch(hideSpinner());
        alert('發生錯誤，請再試一次！(addRecipe)');
        browserHistory.push('/share');
      } else {
        dispatch(hideSpinner());
        window.location.reload();
        browserHistory.push('/');
      }
    })
    .catch(function (error) {
    });
  },
  // 呼叫更新食譜 api，記得附加上我們存在 cookies 的 token
  updateRecipe: (dispatch, recipeId, name, description, imagePath) => {
    axios.put('/api/recipes/' + recipeId + '?token=' + getCookie('token'), {
      id: recipeId,
      name: name,
      description: description,
      imagePath: imagePath,
    })
    .then((response) => {
      if(response.data.success === false) {
        dispatch(hideSpinner());
        dispatch(setRecipe({ key: 'recipeId', value: '' }));
        dispatch(setUi({ key: 'isEdit', value: false }));
        alert('發生錯誤，請再試一次！(updateRecipe)');
        browserHistory.push('/share');
      } else {
        dispatch(hideSpinner());
        window.location.reload();
        browserHistory.push('/');
      }
    })
    .catch(function (error) {
    });
  },
  // 呼叫刪除食譜 api，記得附加上我們存在 cookies 的 token
  deleteRecipe: (dispatch, recipeId) => {
    axios.delete('/api/recipes/' + recipeId + '?token=' + getCookie('token'))
    .then((response) => {
      if(response.data.success === false) {
        dispatch(hideSpinner());
        alert('發生錯誤，請再試一次！(deleteRecipe)');
        browserHistory.push('/');
      } else {
        dispatch(hideSpinner());
        window.location.reload();
        browserHistory.push('/');
      }
    })
    .catch(function (error) {
    });
  }
};
