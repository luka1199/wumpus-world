$(document).on('input', '#world-size-slider', function () {
    roomsPerRow = $(this).val();
    restart();
});

$(document).on('mouseup', 'input[type=\'range\']', function () {
    $(this).blur();
});  