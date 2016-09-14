var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
  var dateTime = new Date().toLocaleString();
  
  console.log('Serving Index');
  
  res.render(__dirname + '/app/views/pages/index', {
    bugsCount: 0 //temp
  });
});

app.listen(8080);