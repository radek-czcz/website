const mysql = require('mysql2');

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'store',
  user:'root',
  password:'asd2%yhfA'
})

var dbConnStatus = '';

connection.connect((error) => {
  if (error) {
    dbConnStatus = '<h3 class="error"> MySQL Database connection error</h3>'
    console.log(result);
  } else {
    dbConnStatus = '<h3 class="error"> MySQL Database connection success</h3>'
    console.log("success");
  }
});

connection.query('SELECT * FROM customers', (err, res, fields) => {
  if (err) {
    console.log(err)
  } else (
    console.log(res)
  )
});

connection.query('SELECT * FROM products', (err, res, fields) => {
  if (err) {
    console.log(err)
  } else (
    console.log(res)
  )
});
