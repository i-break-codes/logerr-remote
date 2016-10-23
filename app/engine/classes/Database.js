var mysql = require('mysql');
var DBConfig = require('../config/DBConfig.js');

var connect = mysql.createConnection({
  host     : DBConfig.HOST,
  user     : DBConfig.USER,
  password : DBConfig.PASS,
  database : DBConfig.NAME
});

var Database = function() {
  function insert(table, data, cb) {
    var query;
    
    query = 'INSERT INTO ' + table + ' SET ?';
    
    connect.query(query, data, (err, result) => {
      if (err) throw err;
      cb({record: data, id: result.insertId});
    });
  }
   
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

    connect.query(query, (err, rows, fields) => {
      if (err) throw err;
      cb({data: rows});
    });
  }
  
  function update(table, columns, values, where_cols, where_values, cb) {
    var query;
    
    query = 'UPDATE ' + table + ' SET ';
    
    for(var i = 0, l = columns.length; i < l; i++) {
      query += columns[i] + ' = ?';
    }
    
    query += ' WHERE ';
    
    for(var i = 0, l = where_cols.length; i < l; i++) {
      query += where_cols[i] + ' = ? ';
    }
    
    var concatVals = values.concat(where_values);
    
    connect.query(query, concatVals, (err, results) => {
      if (err) throw err;
      cb(results);
    });
  }
  
  return {
    connect: connect,
    select: select,
    update: update,
    insert: insert
  }
}

module.exports = Database();