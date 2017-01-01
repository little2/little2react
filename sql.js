
var mysql = require("mysql");
// connect strings for mysql
var connection = mysql.createConnection({
	host: "localhost",
	user: "inetar0_bhrsp",
	password: "EA95FmK2v84AKZ3V",
	database: "vdss"
});



var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO users SET ?', post, function(err, result) {
  // Neat!
});

connection.query(sql,
  function(err, rows, fields) {

    if (err)
		{
				//throw err;
				console.log('[INSERT ERROR] - ',err.message);
				return;
		}

    if (!rows[0])
		{
      console.log({ success: false, message: 'Authentication failed. User not found.' });
    }
		else if (rows[0])
		{
      // check if password matches
      if (rows[0].password != "123") {
        console.log({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
/*
        const token = jwt.sign({ email: rows[0].username }, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        */
        // return the information including token as JSON
         // 若登入成功回傳一個 json 訊息
        console.log({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userId: rows[0].userId
        });
      }
    }
  }

);
