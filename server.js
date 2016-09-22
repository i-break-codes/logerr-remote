var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser = require('body-parser')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'logerr'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/', function(req, res) {
  var dateTime = new Date().toLocaleString();
  
  console.log('Serving Index');
  
  connection.query('SELECT id, err, badge, created_at, read FROM tbl_logs', function(err, rows, fields) {
    if (err) throw err;
    res.render(__dirname + '/app/views/pages/index', {records: rows});
  });
});

app.post('/log', function(req, res) {
  var params = req.body;
  
  var d = new Date(params.datetime),
    dformat = [d.getFullYear() ,d.getMonth()+1,
               d.getDate()
               ].join('-')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');

  var logException = {
    err: params.error,
    file_name: params.filename,
    line_no: params.line,
    col_no: params.column,
    stack_trace: params.stackTrace,
    referrer_url: req.headers.referer,
    created_at: new Date(),
    updated_at: new Date(),
    client_time: dformat,
    user_agent: params.userAgent,
    all_params: JSON.stringify(params),
    badge: params.badge
  };
  
  var query = connection.query('INSERT INTO tbl_logs SET ?', logException, function(err, result) {
    io.emit('exception-logged', {
      requestedFrom: req.get('origin'),
      data: req.body //obviously validate first
    });
    
    res.send(JSON.stringify({
      success: true
    }));
  });
});

http.listen(8080);