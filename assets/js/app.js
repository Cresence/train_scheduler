$('#add-train-btn').on('click', function(event) {
    event.preventDefault();
    var trainInput = $('#train-name-input').val().trim();
    var destInput = $('#destination-input').val().trim();
    var trainTimeInput = $('#train-time-input').val().trim();
    var freqInput = $('#frequency-input').val().trim();

    console.log(trainInput);
    console.log(destInput);
    console.log(trainTimeInput);
    console.log(freqInput);
})