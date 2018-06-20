$( document ).ready(function() {
    jQuery(function($){
        var $commandForm = $('#send-command');
        var $commandBox = $('#command');
        var $chatCommand = $('#chat-command');
        var $sendBtn = $('.sendBtn');
        var $userList = $('.userList');
        var $runCommandBtn = $('.run-command-btn');

        $commandForm.submit(function(e) {
            e.preventDefault();
            saveRenderCommand();
        });

        $userList.on('change', function() {
            var selectedUserId = $(this).children(":selected").attr("id");
            getCommandsCall({receiver: selectedUserId});
        });

        if($userList.val() != null) {
            var selectedUserId = $userList.children(":selected").attr("id");
            getCommandsCall({receiver: selectedUserId});
        }

        $runCommandBtn.on('click', function() {
            var command = $(this).attr('command-text');
            try {
                eval(JSON.parse(command)); 
            } catch (e) {
                alert(e.message);
            }
        });

        function saveRenderCommand() {
            var warnings = checkWarnings();
            if(warnings) {
                alert(warnings);
                return;
            }
            var selectedUserId = $userList.children(":selected").attr("id");
            var params = {
                receiver: selectedUserId,
                command: $commandBox.val()
            };
            sendCommandCall(params);
        }

        function sendCommandCall(params) {
            $.ajax({
                type: "POST",
                url: '/send-command',
                data: params,
                dataType: 'json',
                success: function(data) {
                    appendCommand(params.command)
                    console.log(data);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        function getCommandsCall(params) {
            $.ajax({
                type: "GET",
                url: '/user-commands',
                data: params,
                dataType: 'json',
                success: function(data) {
                    loadCommands(data);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        function appendCommand(command) {
            var nrCommands = $('.commandMsg').length;
            $chatCommand.append('<span class="commandMsg"><b>Command ' + ++nrCommands + ': </b>' + command + "</span><br/>");
            $chatCommand.scrollTop($chatCommand[0].scrollHeight);
            $commandBox.val('');
        }

        function loadCommands(data) {
            $chatCommand.empty();
            for (var i = data.length - 1 ; i >= 0; i--) {
                var nrCommands = $('.commandMsg').length;
                $chatCommand.append('<span class="commandMsg"><b>Command ' + ++nrCommands + ': </b>' + data[i].command + "</span><br/>");
            };
            $chatCommand.scrollTop($chatCommand[0].scrollHeight);
        }


        function checkWarnings() {
            if($userList.val() == null) {
                return 'Please select a user from the list';
            } else if(!$commandBox.val()) {
                return 'Please enter text';
            }
            return null;
        }
    });
});
