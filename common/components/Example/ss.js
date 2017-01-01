'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 初始化 Express server
/* config */
var app = new _express2.default(); /* Server Packages */

var port = process.env.PORT || 3001;

var handleRender = function handleRender(req, res) {
  console.log(res);
  console.log(req);
};
//app.use(handleRender);
app.use(_express.static(__dirname));

// 監聽 server 狀況
app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> \uD83C\uDF0E  Listening on port ' + port + '. Open up http://localhost:' + port + '/ in your browser.');
  }
});
