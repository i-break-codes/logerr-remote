var App = function() {
  var socket = io();
  
  function init() {
    getLogs();
    addToLog();
  }
  
  function addToLog() {
    socket.on('exception-logged', function(msg) {
      var template;
      template  = '<li>';
      template += '<div class="log-item-wrapper">';
      template += '<div class="log-info clear">';
      template += '<div class="log-badge development-badge">' + msg.data.badge + '</div>';
      template += '<div class="log-time">' + msg.data.created_at + '</div>';
      template += '</div>';
      template += '<h4>' + msg.data.error + '</h4>';
      template += '</div>';
      template += '</li>';
  
      $('.log-list ul').append(template);
    });
  }
  
  function getLogs() {
  
  }
  
  return {
    init: init
  }
}();