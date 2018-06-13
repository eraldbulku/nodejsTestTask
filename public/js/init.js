$( document ).ready(function() {
    jQuery(function($){
        var socket = io.connect();
        var $messageForm = $('#send-message');
        var $messageBox = $('#message');
        var $chat = $('#chat');
        var $sendBtn = $('.sendBtn');
        var $userList = $(".userList");
        var userLoggedId = $("#userId").val();
        var isAdmin = $("#isAdmin").val();

        $messageForm.submit(function(e) {
            e.preventDefault();
            saveRenderMsg();
        });

        socket.on('load_old_msgs', function(data) {
            loadOlsMsg(data);
        });

        socket.on('new_message', function(data) {
            var selectedUserId = $userList.children(":selected").attr("id");
            if(userLoggedId == data.sender || selectedUserId == data.sender || (userLoggedId == data.receiver && !isAdmin)) {
                displayMsg(data);
            }
        });

        $userList.on('change', function() {
            var selectedUserId = $(this).children(":selected").attr("id");
            socket.emit('render_chat', userLoggedId, selectedUserId);
        });

        if(!isAdmin) {
            socket.emit('render_chat', userLoggedId, null);
        } else if($userList.val() != null) {
            var selectedUserId = $userList.children(":selected").attr("id");
            socket.emit('render_chat', userLoggedId, selectedUserId);
        }

        function displayMsg(data) {
            $chat.append('<span class="msg"><b>' + data.nick + ': </b>' + data.message + "</span><br/>");
            $chat.scrollTop($chat[0].scrollHeight);
        }

        function loadOlsMsg(data) {
            $chat.empty();
            for (var i = data.length - 1 ; i >= 0; i--) {
                $chat.append('<span class="msg"><b>' + data[i].sender.name + ': </b>' + data[i].message + "</span><br/>");
            };
            $chat.scrollTop($chat[0].scrollHeight);
        }

        function saveRenderMsg() {
            var warnings = checkWarnings();
            if(warnings) {
                alert(warnings);
                return;
            }
            var selectedUserId = $userList.children(":selected").attr("id");
            var params = {
                userId: userLoggedId,
                selectedUserId: selectedUserId,
                message: $messageBox.val()
            };

            socket.emit('send_message', params, function(data) {
                $chat.append('<span class="error">' + data + "</span><br/>");
            });
            $chat.scrollTop($chat[0].scrollHeight);
            $messageBox.val('');
        }

        function checkWarnings() {
            if(isAdmin && $userList.val() == null) {
                return 'Please select a user from the list';
            } else if(!$messageBox.val()) {
                return 'Please enter text';
            }
            return null;
        }
    });
});
