$(document).on('input', '#world-size-slider', function () {
    roomsPerRow = $(this).val();
    restart();
});

$(document).on('mouseup', '#world-size-slider', function () {
    $(this).blur();
});  