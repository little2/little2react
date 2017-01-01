/* Server Packages */
import Express from 'express';

// 初始化 Express server
/* config */
const app = new Express();
const port = process.env.PORT || 3001;

app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
    response.end('你好！'); //作出回應
});

const handleRender = (req, res) => {
  console.log(res);
    console.log(req);

}
//app.use(handleRender);
// 監聽 server 狀況
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
