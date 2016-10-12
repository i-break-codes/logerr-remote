var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var basePath = __dirname + '/app';

app.set('view engine', 'ejs');
app.use(express.static(basePath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Controllers
var LogController = require("./app/engine/controllers/LogController.js");

app.get('/', function(req, res) {
  var loadPath = basePath + '/views/pages/index';
  LogController.getLogs(req, res, loadPath);
});

app.post('/log', function(req, res) {
  LogController.addLog(io, req, res);
});

app.post('/exception-data', function(req, res) {
  LogController.getExceptionData(req, res);
});

app.post('/log-read', function(req, res) {
  LogController.markExceptionAsRead(req, res);
});

http.listen(8080);