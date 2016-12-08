/* Server Packages */
import Express from 'express';
//*import qs from 'qs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//import mongoose from 'mongoose';
import config from './config';
//import User from './models/user';
//import Recipe from './models/recipe';
/* Client Packages */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';
/* Common Packages */
import webpackConfig from '../webpack.config';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore';
import fetchComponentData from '../common/utils/fetchComponentData';
import apiRoutes from './controllers/api.js';
//*import CounterContainer from '../common/containers/CounterContainer';
//*import { fetchCounter } from '../common/api/counter';

/*
首先我們用 express 建立了一個 port 為 3000 的 server，並使用 webpack 去執行 client 的程式碼。
*/

/* config */
const app = new Express();
const port = process.env.PORT || 3000;
//mongoose.connect(config.database); // connect to database
app.set('env', 'production');
app.use('/static', Express.static(__dirname + '/public'));
app.use(cookieParser());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false })); // only can deal with key/value
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route handler
//function handleRender(req, res) {
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
      // Combined initial state to immutable format
      // 將 initialState 轉成 immutable 和符合 state 設計的格式
      const initialState = fromJS({
        user: {
          isAuthorized: isAuthorized,
          isEdit: false,
        }
      });
      // 建立一個 redux store
      // Create a new Redux store instance
      const store = configureStore(initialState);
      // 使用 renderToString 將 component 轉為 string
      // Render the component to a string
      const html = renderToString(
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
      );
      // 從建立的 redux store 中取得 initialState
      // Grab the initial state from our Redux store
      const finalState = store.getState();
      // Send the rendered page back to the client
      // 將 HTML 和 initialState 傳到 client-side
      res.send(renderFullPage(html, finalState));
    })
    //.catch(err => res.end(err.message));

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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
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
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
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
