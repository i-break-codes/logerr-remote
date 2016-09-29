var mysql = require('mysql');
var DBConfig = require('../config/DBConfig.js');

var Database = function() {
  var connect = mysql.createConnection({
    host     : DBConfig.HOST,
    user     : DBConfig.USER,
    password : DBConfig.PASS,
    database : DBConfig.NAME
  });
  
  function select(cols, table, where, order_by, limit) {
    var query;
    
    query  = 'SELECT ' + cols + ' FROM ' + table;
    query += 'FROM ' + table;
    
    if(where) {
      query += ' WHERE ' + where;
    }
    
    if(order_by) {
      query += ' ORDER BY ' + order_by;
    }
    
    if(limit) {
      query += ' LIMIT ' + limit;
    }
  }
  
  return {
    connect: connect
  }
}

module.exports = Database();