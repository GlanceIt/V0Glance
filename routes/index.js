var express = require('express')
var app = express()
var mysql      = require('mysql');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fuck@1123',
  database : 'fisk_db'
});

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... \n\n");
  } else {
      console.log("Error connecting database ... \n\nerror: " + err + "\n\n");
  }
});

app.get("/spots/:spot",function(req,res){
  var spot = req.params.spot;
  //res.send(spot+':</br>Wifi: 2</br>Staff: 3</br>');
  //connection.query('SELECT * from rating WHERE spot = \'' + spot + '\'', function(err, rows, fields) {
  connection.query('SELECT * from rating WHERE spot = ?', spot, function(err, rows, fields) {
    if (!err) {
      console.log('The ratings for spot ' + spot + ' are: ', rows);
      res.send(rows);
    }
    else {
      console.log('Error while performing Query.');
      res.send('Error while performing Query for spot: ' + spot);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
