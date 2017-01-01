import Express from 'express';
import jwt from 'jsonwebtoken'; //hash sha1还是JWT(Json Web Token)。
import config from '../config';

/* 數據庫
*/
let mysql = require("mysql");
import sqlplugins from '../../common/utils/sql-plugins.js';
let db = new sqlplugins();
// connect strings for mysql
var connection = mysql.createConnection({
	host: "localhost",
	user: "inetar0_bhrsp",
	password: "EA95FmK2v84AKZ3V",
	database: "vdss"
});

var FakeObjectDataListStore = require('../../helpers/FakeObjectDataListStore');

// API Route
const app = new Express();
const apiRoutes = Express.Router();
// 設定 JSON Web Token 的 secret variable
app.set('superSecret', config.secret); // secret variable






/* 使用者登入 API ，依據使用 email 和 密碼去驗證，若成功則回傳一個認證 token（時效24小時）
我們把它存在 cookie 中，方便前後端存取。這邊我們先不考慮太多資訊安全的議題
*/
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/login', function(req, res) {

  const sql="SELECT * FROM `users` WHERE `username` LIKE '"+req.body.email+"'";

  connection.query(sql,
    function(err, rows, fields) {

      if (err) throw err;

      if (!rows[0]) {
        res.json({ success: false, message: '登入失敗, 使用者不存在' });
      } else if (rows[0]) {
        // check if password matches
        if (rows[0].password != req.body.password) {
          res.json({ success: false, message: '登入失敗, 帳號或密碼錯誤' });
        } else {
          // if user is found and password is right
          // create a token
          const token = jwt.sign({ email: rows[0].username }, app.get('superSecret'), {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });
          // return the information including token as JSON
           // 若登入成功回傳一個 json 訊息
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            userId: rows[0].userId
          });
        }
      }
    }

  );
});

/* 使用者登入 API ，依據使用 email 和 密碼去驗證，若成功則回傳一個認證 token（時效24小時）
我們把它存在 cookie 中，方便前後端存取。這邊我們先不考慮太多資訊安全的議題
*/
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/loginInstant', function(req, res) {

  const sql="SELECT * FROM `users` WHERE `password` LIKE '"+req.body.password+"'";

  connection.query(sql,
    function(err, rows, fields) {

      if (err) throw err;

      if (!rows[0]) {
        res.json({ success: false, message: '快速登入失敗, 使用者不存在' });
      } else if (rows[0]) {

          // if user is found and password is right
          // create a token

          const token = jwt.sign({ email: rows[0].username }, app.get('superSecret'), {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });

          // return the information including token as JSON
           // 若登入成功回傳一個 json 訊息
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            userId: rows[0].userId
          });

      }
    }

  );
});

/* create  新增使用者  */
apiRoutes.post('/createUser', (req, res) => {
	let query = connection.query('INSERT INTO users SET ?', req.body);
	query
	  .on('error', function(err) {
	    // Handle error, an 'end' event will be emitted after this as well
			res.json({
				success: false,
				err: err.message,
				errCode: err.code,
			});
	  })
	  .on('fields', function(fields) {
	    // the field packets for the rows to follow
	  })
	  .on('result', function(row) {
	    // Pausing the connnection is useful if your processing involves I/O
	    // connection.pause();

			res.json({
				success: true,
				message: '新增成功'
			});

	    // processRow(row, function() {
	    //   connection.resume();
	    // });
	  })
	  .on('end', function() {
	    // all rows have been received
	  });

});

/* 回傳所有 users */
apiRoutes.get('/users', (req, res) => {
	let sql='SELECT * FROM users';
	  connection.query(sql,
	    function(err, rows, fields) {

	      if (err) throw err;

	      if (!rows[0]) {
	        res.json({ success: false, message: '查找失敗' });
	      } else if (rows[0]) {
	          // return the information including token as JSON
	           // 若登入成功回傳一個 json 訊息
	          res.json({
							success: true,
							message: '查找',
							rows: rows
	          });
	      }
	    }
	  );
});


/*初始化 api，一開始資料庫尚未建立任何使用者，我們需要在瀏覽器輸入
 `http://localhost:3000/api/setup`，進行資料庫初始化。
 這個動作將新增一個使用者、一份食譜，若是成功新增將回傳一個 success 訊息
*/
apiRoutes.get('/setup', (req, res) => {
  // create a sample user
  const sampleUser = new User({
    username: 'mark',
    email: 'mark@demo.com',
    password: '123456',
    admin: true
  });

  const sampleRecipe = new Recipe({
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    name: '番茄炒蛋',
    description: '番茄炒蛋，一道非常經典的家常菜料理。雖然看似普通，但每個家庭都有屬於自己家裡的不同味道',
    imagePath: 'https://c1.staticflickr.com/6/5011/5510599760_6668df5a8a_z.jpg',
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
    updatedAt: new Date()
  });

  // save the sample user
  sampleUser.save((err) => {
    if (err) throw err;
    sampleRecipe.save((err) => {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    })
  });
});


// 回傳所有 recipes
apiRoutes.get('/recipes', (req, res) => {
  let recipes= new FakeObjectDataListStore(5).getAll();

  /*
  const recipes = [
    {
      id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
      name: '番茄炒蛋',
      description: '番茄炒蛋，一道非常經典的家常菜料理。雖然看似普通，但每個家庭都有屬於自己家裡的不同味道',
      imagePath: 'https://c1.staticflickr.com/6/5011/5510599760_6668df5a8a_z.jpg',
      steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
      updatedAt: new Date()
    },
    {
      id: '110ec58a-a0f2-4ac4-8393-c866d813b8d2',
      name: '番茄炒蛋a',
      description: '番茄炒蛋，一道非常經典的家常菜料理。雖然看似普通，但每個家庭都有屬於自己家裡的不同味道',
      imagePath: 'https://c1.staticflickr.com/6/5011/5510599760_6668df5a8a_z.jpg',
      steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
      updatedAt: new Date()
    },
  ]
  /*
  const rows = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
  ];
  */
  //Recipe.find({}, (err, recipes) => {
    res.status(200).json(recipes);
  //})
});

/* 接下來的 api 將進行控管，也就是說必須在網址請求中夾帶認證 token 才能完成請求
*/
// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  // 確認標頭、網址或 post 參數是否含有 token，本範例因為簡便使用網址 query 參數
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

// 確認認證是否成功
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/authenticate', (req, res) => {
  res.json({
    success: true,
    message: 'Enjoy your token!',
  });
});

// create recipe 新增食譜
// create recipe
apiRoutes.post('/recipes', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
    updatedAt: new Date()
  });

  newRecipe.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// update recipe 根據 _id（mongodb 的 id）更新食譜
// update recipe
apiRoutes.put('/recipes/:id', (req, res) => {
  Recipe.update({ _id: req.params.id }, {
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
    updatedAt: new Date()
  } ,(err) => {
    if (err) throw err;
    console.log('User updated successfully');
    res.json({ success: true });
  });
});

// remove recipe 根據 _id 刪除食譜，若成功回傳成功訊息
// remove recipe
apiRoutes.delete('/recipes/:id', (req, res) => {
  Recipe.remove({ _id: req.params.id }, (err, recipe) => {
    if (err) throw err;
    console.log('remove saved successfully');
    res.json({ success: true });
  });
});

export default apiRoutes;
