var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Controllers
var LogController = require("./app/engine/controllers/LogController.js");

app.get('/', function(req, res) {
  var loadPath = __dirname + '/app/views/pages/index';
  LogController.getLogs(req, res, loadPath);
});

app.post('/log', function(req, res) {
  LogController.addLog(req, res);
});

app.post('/exception-data', function(req, res) {
  LogController.getExceptionData(req, res);
});

app.post('/log-read', function(req, res) {
  var params = req.body;
  
  connection.query('UPDATE posts SET read = 1 WHERE id = ' + params.id, function (err, result) {
    if (err) throw err;
    res.send({
      success: 'ok'
    });
  });
});

http.listen(8080);