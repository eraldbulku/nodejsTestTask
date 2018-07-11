$( document ).ready(function() {
    jQuery(function($){
        var $optionsLit = $('.optionsLit');
        var $btnElement = $('.btnElement');
        var $checkboxElement = $('.checkboxElement');
        var $radioElement = $('.radioElement');
        var $numberElement = $('.numberElement');
        var $colorElement = $('.colorElement');
        var OPTION_EVENT = 'select option';
        var BUTTON_EVENT = 'button click';
        var CHECKBOX_EVENT = 'checkbox';
        var RADIO_EVENT = 'radiobutton';
        var NUMBER_EVENT = 'number change';
        var COLOR_EVENT = 'color change';

        $optionsLit.on('change', function() {
            var selectedOption = $(this).children(":selected").attr("id");
            var params = {
                event: OPTION_EVENT,
                action: selectedOption
            }; 
            actionCall(params);
        });

        $btnElement.on('click', function() {
            var selectedBtn = $(this).attr("id");
            var params = {
                event: BUTTON_EVENT,
                action: selectedBtn
            }; 
            actionCall(params);
        });

        $checkboxElement.change(function() {
            if($(this).is(":checked")) {
                var event = CHECKBOX_EVENT + ' check';
            } else {
                var event = CHECKBOX_EVENT + ' uncheck';
            }
            var selectedCheckbox = $(this).attr("id");
            var params = {
                event: event,
                action: selectedCheckbox
            };
            actionCall(params);
        });

        $radioElement.on('click', function() {
            var selectedRadio = $(this).attr("id");
            var params = {
                event: RADIO_EVENT,
                action: selectedRadio
            }; 
            actionCall(params);
        });

        $numberElement.bind('change', function (e) {
            var value = $(this).val();
            var params = {
                event: NUMBER_EVENT,
                action: value
            }; 
            actionCall(params);
        });

        $colorElement.bind('change', function (e) {
            var value = $(this).val();
            var params = {
                event: COLOR_EVENT,
                action: value
            };
            actionCall(params);
        });

        function actionCall(params) {
            $.ajax({
                type: "POST",
                url: '/action/user-action',
                data: params,
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
});
