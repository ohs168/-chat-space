$(function() {
  function buildHTML(message) {
    var html =`<div class = "message">
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
                  <div class = "lower-message__image">
                    ${ message.image ? `<img src = '${ message.image }'>`: ""}
                  </div>
                </div>
              </div>`
  return(html)
  }

  function scroll() {
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 'slow');
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
});
