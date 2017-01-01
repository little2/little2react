/*
//mysql
var mysql = require("mysql");
// connect strings for mysql
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root123",
	database: "test"
});

// connecting ......
connection.connect();
*/
function test1(callback) {
  const sql="SELECT * FROM `user` WHERE `username` LIKE '1'";

  connection.query(sql,
    function(err, rows, fields) {
      if (err) throw err;
      let num=Math.floor((rows[0].password)+100);

      callback(null,num);
    }
  );

}


function test2() {
return 'test2';

}

function getRandomInt(min, max) {
/*
  const sql="SELECT * FROM `user` WHERE `username` LIKE '1'";

  connection.query(sql,
    function(err, rows, fields) {
      if (err) throw err;
      let num=Math.floor((rows[0].password)+100);
      console.log('The solution iss: ', num);
      return num;
    }

  );

  console.log('The solution is: ', num);
  return num;
*/

  return Math.floor(Math.random() * (max - min)) + min
}

/*
在這個範例中我們使用 setTimeout() 來模擬非同步的產生資料讓 server 端
在每次接收 request 時讀取隨機產生的值。
實務上，我們會開 API 讓 Server 讀取初始要匯入的 initialState。
*/
export function fetchCounter(callback) {
  //let t1=test1(function(err,num){console.log(num);return num;});
  //console.log('t1='+t1);
  //let t2=test2();
  //setTimeout(() => {
    callback(getRandomInt(1, 100))
//  }, 500)
}
