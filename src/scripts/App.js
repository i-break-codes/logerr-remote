var App = function() {
  var socket = io();
  
  function init() {
    getLogs();
    addToLog();
    getLogSummary();
  }
  
  function addToLog() {
    socket.on('exception-logged', function(msg) {
      
      // TODO: Refactor
      var t;
      t  = '<li data-id="' + msg.data.id + '" class="log-unread">';
      t += '<div class="log-item-wrapper">';
      t += '<div class="log-info clear">';
      t += '<div class="log-badge development-badge">' + msg.data.badge + '</div>';
      t += '<div class="log-time">' + new Date(msg.data.created_at )+ '</div>';
      t += '</div>';
      t += '<h4>' + msg.data.err + '</h4>';
      t += '</div>';
      t += '</li>';
  
      $('.log-list ul').prepend(t);
      
      showDesktopNotification(msg);
    });
  }
  
  function getLogs() {
  
  }
  
  function showDesktopNotification(msg) {
    Notification.requestPermission().then(function(result) {
      var breakNotification = msg.data.err.split(':');
      
      new Notification(breakNotification[0], {
        icon: '/assets/images/error.png',
        body: breakNotification[1].trim(),
      });
    });
  }
  
  function askNotificationPermission() {
    if (!("Notification" in window)) {
       throw 'Desktop notifications not supported';
       return;
     }
     
     //check if the user has his permission set to allowAll or allow
     if (Notification.permission !== 'denied') {
       Notification.requestPermission();
     }

  }
  
  function getLogSummary() {
    $('#log-list').on('click', 'ul li', function() {
      $(this).siblings().removeClass('active-log');
      $(this).addClass('active-log');
      
      window.location.hash = 'id=' + $(this).data('id');
      
      $.ajax({
        url: '/log-read',
        type: 'post',
        dataType: 'json',
        data: {
          id: $(this).data('id')
        },
        success: function(res) {
          console.log('read success');
        },
        error: function() {
          throw 'dicks';
        }
      });
      
      $.ajax({
        url: '/exception-data',
        type: 'post',
        dataType: 'json',
        data: {
          id: $(this).data('id')
        },
        success: function(res) {
          printLogSummary(res);
        },
        error: function() {
          throw 'dicks';
        }
      });
    });
  }
  
  function printLogSummary(res) {
    var data = res.data[0];
    var wrapper = $('.log-summary-details');
    
    $('.no-data').addClass('hide');
    $('.log-summary-details').removeClass('hide');
    
    //Remove Read Reciept
    $('#log-list').find('li[data-id="' + data.id + '"]').removeClass('log-unread');
    
    // TODO: Refactor this shitty code
    wrapper.find('h2').text(data.err);
    wrapper.find('.log-stack-trace span:eq(1)').text(data.stack_trace);
    wrapper.find('.log-file-name span:eq(1)').text(data.file_name);
    wrapper.find('.log-file-line span:eq(1)').text(data.line_no);
    wrapper.find('.log-file-column span:eq(1)').text(data.col_no);
    wrapper.find('.log-file-column span:eq(1)').text(data.col_no);
    wrapper.find('.log-client-time span:eq(1)').text(new Date(data.client_time));
    wrapper.find('.log-user-agent span:eq(1)').text(data.user_agent);
  }
  
  return {
    init: init
  }
}();