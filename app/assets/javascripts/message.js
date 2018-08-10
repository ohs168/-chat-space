$(document).on('turbolinks:load', function(){
  $(function() {
    function buildHTML(message) {
      var img = message.image ? `<img src="${ message.image }" class='message__image'>`: ""
      var html =`<div class = "message" data-id = "${ message.id }">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class = "upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class = "lower-message">
                    <div class = "lower-message__content">
                      ${ message.content }
                    </div>
                      ${ img }
                  </div>
                </div>`
    return(html)
    }

    function scroll() {
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
    };

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        $('#new_message')[0].reset();
        scroll();
      })
      .fail(function(){
        alert('メッセージを入力してください');
      });
      return false;
    });

    $(window).on('load', function() {
      if(document.URL.match('messages')) {
        setInterval(function() {
          var url = $('#new_message').attr('action');
          var message_id = $('.message:last').data('id');
          if (message_id) {
            $.ajax({
              url: url,
              type: 'GET',
              dataType: 'json',
              data: {'id': message_id}
            })
            .done(function(data) {
              data.forEach(function(message) {
                var html = buildHTML(message);
                $('.messages').append(html);
              });
              scroll();
            })
            .fail(function(data) {
              alert('通信に失敗しました。')
            })
          }
        }, 5000);
      }
    });
  });
});
