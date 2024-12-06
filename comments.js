// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Use body-parser to read POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Use static files in public directory
app.use(express.static('public'));
// Use EJS template engine
app.set('view engine', 'ejs');
// Use MySQL database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comments'
});
connection.connect();
// Create table if not exists
connection.query('CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), comment TEXT)', function (err, results) {
  if (err) throw err;
});
// Create page
app.get('/', function (req, res) {
  connection.query('SELECT * FROM comments', function (err, results) {
    if (err) throw err;
    res.render('comments', { comments: results });
  });
});
// Add comment
app.post('/', function (req, res) {
  connection.query('INSERT INTO comments SET ?', req.body, function (err, results) {
    if (err) throw err;
    res.redirect('/');
  });
});
// Start server
app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});
