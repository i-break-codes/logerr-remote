var mysql = require('mysql');
var DBConfig = require('../config/DBConfig.js');

var Database = function() {
  var connect = mysql.createConnection({
    host     : DBConfig.HOST,
    user     : DBConfig.USER,
    password : DBConfig.PASS,
    database : DBConfig.NAME
  });
  
  function select(cols, table, where, order_by, limit, cb) {
    var query;
    
    query  = 'SELECT ' + cols + ' FROM ' + table;
    
    if(where) {
      query += ' WHERE ' + where;
    }
    
    if(order_by) {
      query += ' ORDER BY ' + order_by;
    }
    
    if(limit) {
      query += ' LIMIT ' + limit;
    }
    
    console.log(query);
    
    connect.query(query, function(err, rows, fields) {
      if (err) throw err;
      cb({data: rows});
    });
  }
  
  return {
    connect: connect,
    select: select
  }
}

module.exports = Database();