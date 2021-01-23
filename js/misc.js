$(document).on('input', '#world-size-slider', function () {
    roomsPerRow = $(this).val();
    restart();
});

$(document).on('mouseup', 'input[type=\'range\']', function () {
    $(this).blur();
});  

$(document).on('input', '#volume-slider', updateVolume);

function updateVolume() {
    var volumePercent = $('#volume-slider').val();
    var volume = volumePercent / 100
    $('.volume-value').html(`${volumePercent}%`);
    masterVolume(volume);
}