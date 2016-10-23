var Database = require("../classes/Database.js");

var LogController = function() {
  function getLogs(req, res, path) {
    var dateTime = new Date().toLocaleString();
    
    Database.select('id, err, badge, created_at, is_read', 'tbl_logs', null, 'id DESC', 20, (data) => {
      res.render(path, data);
    });
  }
  
  function addLog(io, req, res) {
    var params = req.body;
    
    var d = new Date(params.datetime),
        dformat = [d.getFullYear() ,d.getMonth()+1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

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
    
    // TODO: Validate
    Database.insert('tbl_logs', logException, (data) => {
      var sendData = data.record;
          sendData.id = data.id;
      
      io.emit('exception-logged', {
        data: sendData
      });
      
      res.send(JSON.stringify({
        success: true
      }));
    });
  }
  
  function getExceptionData(req, res) {
    var params = req.body;
    
    Database.select('*', 'tbl_logs', 'id = ' + params.id, 'id DESC', 20, (data) => {
      res.send(data);
    });
  }
  
  function markExceptionAsRead(req, res) {
    var params = req.body;
    
    Database.update('tbl_logs', ['is_read'], [1], ['id'], [params.id], (data) => {
      res.send(data);
    });
  }
  
  return {
    getLogs: getLogs,
    addLog: addLog,
    getExceptionData: getExceptionData,
    markExceptionAsRead: markExceptionAsRead
  }
}

module.exports = LogController();