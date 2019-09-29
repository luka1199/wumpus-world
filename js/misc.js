$(document).on('input', '#world-size-slider', function () {
    roomsPerRow = $(this).val();
    restart();
});