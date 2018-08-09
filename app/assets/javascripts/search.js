$(document).on('turbolinks:load', function(){
  $(function() {
    var searchResult = $('#user-search-result'); //userの検索結果
    var addedUsers = $('#chat-group-users'); //追加されたuser

    function appendUser(user) {//インクリメンタルサーチの結果を表示させる関数
      var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user.name }</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
       </div>`
      searchResult.append(html);
    }

    function appendNoUser(user) { //該当userがいない場合の関数
      var html =
      `<div class="chat-group-user clearfix">
         <p>${ user }</p>
       </div>`
       searchResult.append(html);
    }

    function appendToMember(userName, userId) { //検索結果からチャットメンバーに追加する関数
      var html =
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ userId }'>
         <input name='group[user_ids][]' type='hidden' value='${ userId }'>
         <p class='chat-group-user__name'>${ userName }</p>
         <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      addedUsers.append(html)
    }

    $("#user-search-field").on('keyup', function(){ //検索窓に入力された時発火
      var input = $.trim($(this).val()); //文字列の両端の空白を削除
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(users){
        $('#user-search-result').empty(); //要素内の子要素(テキストも対象)を全て削除
        if (users.length !== 0 ) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser('該当するユーザーがいません');
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      })
    });

    $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
      var userName = $(this).data('user-name');
      var userId = $(this).data('user-id');
      appendToMember(userName, userId);
      $(this).parent().remove();
    });

    $('#chat-group-users').on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
    });
  });
});
