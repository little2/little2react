// 引入 Express、mongoose（MongoDB ORM）以及相關 server 上使用的套件
/* Server Packages */
import Express from 'express';
//*import qs from 'qs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//import mongoose from 'mongoose';
import config from './config';
// 引入後端 model 透過 model 和資料庫互動
//import User from './models/user';
//import Recipe from './models/recipe';

// 引入 webpackDevMiddleware 當做前端 server middleware
/* Client Packages */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

// import webpackDevServer from 'webpack-dev-server';  //熱更新

import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';
/* Common Packages */
import webpackConfig from '../webpack.server.config';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore';
import fetchComponentData from '../common/utils/fetchComponentData';
import apiRoutes from './controllers/api.js';
//*import CounterContainer from '../common/containers/CounterContainer';
//*import { fetchCounter } from '../common/api/counter';



/*
首先我們用 express 建立了一個 port 為 3000 的 server，並使用 webpack 去執行 client 的程式碼。
*/

// 初始化 Express server
/* config */
const app = new Express();
const port = process.env.PORT || 3000;
// 連接到資料庫，相關設定檔案放在 config.database
//mongoose.connect(config.database); // connect to database
app.set('env', 'production');
// 設定靜態檔案位置
app.use('/static', Express.static(__dirname + '/public'));
app.use('/fonts', Express.static(__dirname + '/fonts'));
app.use(cookieParser());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false })); // only can deal with key/value
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route handler
//function handleRender(req, res) {
// 負責每次接受到 request 的處理函數，判斷該如何處理和取得 initialState 整理後結合伺服器渲染頁面傳往前端
const handleRender = (req, res) => {

  // Query our mock API asynchronously
  // 模仿實際非同步 api 處理情形
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    }
    fetchComponentData(req.cookies.token).then((response) => {
    //fetchCounter(apiResult => {
      // Read the counter from the request, if provided
      let isAuthorized = false;

      if (response[0].data.success === true) {
         isAuthorized = true;
      } else {
        isAuthorized = false;
      }



      // Combined initial state to immutable format
      // 將 initialState 轉成 immutable 和符合 state 設計的格式
      const initialState = fromJS({
        recipe: {
          recipes: [],
          recipe: {
            id: '',
            name: '',
            description: '',
            imagePath: '',
          }
        },
        user: {
          isAuthorized: isAuthorized,
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
      // 使用 renderToString 將 component 轉為 string
      // Render the component to a string
      const initView = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
      );
      // 從建立的 redux store 中取得 initialState
      // Grab the initial state from our Redux store

      let state = store.getState();
      // Send the rendered page back to the client
      // 將 HTML 和 initialState 傳到 client-side
      let page = renderFullPage(initView, state);
      return res.status(200).send(page);


    })
    .catch(err => res.end(err.message));

  })
}

/*
HTML Markup，同時也把 preloadedState 轉成字串（stringify）
傳到 client-side，又稱為 dehydration（脫水）
*/
const renderFullPage = (html, preloadedState) => (
   `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>


        <link rel="stylesheet" src="node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
    		<script src="/static/jquery-2.1.3.min.js"></script>
    		<link  href="/static/bootstrap.min.css" rel="stylesheet">
      	<script src="/static/bootstrap.min.js"></script>
    		<link  href="/static/keyboard.css" rel="stylesheet">


      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
);




// 使用 middleware 於 webpack 去進行 hot module reloading
// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);

/*
webpack-dev-middleware和webpack-hot-middleware的静态资源服务只用于开发环境。
到了线上环境，应该使用express.static()。
*/
/*
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true ,
  stats: {
      colors: true
  }
  }
));
*/

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true ,
    historyApiFallback: false,
    stats: {
        colors: true
    }
  }
));




app.use(webpackHotMiddleware(compiler));

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// This is fired every time the server side receives a request
// 每次 server 接到 request 都會呼叫 handleRender
app.use(handleRender);

// 監聽 server 狀況
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
