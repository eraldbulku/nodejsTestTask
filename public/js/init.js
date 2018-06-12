$( document ).ready(function() {
    jQuery(function($){
        var socket = io.connect();
        var $messageForm = $('#send-message');
        var $messageBox = $('#message');
        var $chat = $('#chat');
        var $sendBtn = $('.sendBtn');
        var userId = $("#userId").val();

        $messageForm.submit(function(e) {
            e.preventDefault();
            if(!$messageBox.val()) {
                alert('Please enter text');
                return;
            }
            socket.emit('send_message', $messageBox.val(), function(data) {
                $chat.append('<span class="error">' + data + "</span><br/>");
            });
            $chat.scrollTop($chat[0].scrollHeight);
            $messageBox.val('');
        });

        socket.on('load_old_msgs', function(data) {
            for (var i = data.length - 1 ; i >= 0; i--) {
                $chat.append('<span class="msg"><b>' + data[i].sender.name + ': </b>' + data[i].message + "</span><br/>");
            };
            $chat.scrollTop($chat[0].scrollHeight);
        });

        socket.on('new_message', function(data) {
            if(userId == data.sender || userId == data.receiver) {
                displayMsg(data);
            }
        });

        socket.emit('chat', userId);

        function displayMsg(data) {
            $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.message + "</span><br/>");
            $chat.scrollTop($chat[0].scrollHeight);
        }
    });
});
