var trainData = [];
console.log (trainData);
var now = moment();
console.log(now);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC2CzGBkYn4z0XSpaCGzheL-ADzU-izkVo",
    authDomain: "train-schedule-35c7f.firebaseapp.com",
    databaseURL: "https://train-schedule-35c7f.firebaseio.com",
    projectId: "train-schedule-35c7f",
    storageBucket: "",
    messagingSenderId: "591642252959",
    appId: "1:591642252959:web:7e236b938be6c528"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


// var currentTime = moment().hour(Number) + ':' + moment().minute(number);
// console.log(currentTime);



$('#add-train-btn').on('click', function(event) {
    // event.preventDefault();

    
    var trainInput = $('#train-name-input').val().trim();
    var destInput = $('#destination-input').val().trim();
    var trainTimeInput = $('#train-time-input').val().trim();
    var freqInput = $('#frequency-input').val().trim();

    console.log(trainInput);
    console.log(destInput);
    console.log(trainTimeInput);
    console.log(freqInput);

    // Time is 3:30 AM

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTimeInput, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freqInput;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freqInput - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    trainData.push(trainInput, destInput, trainTimeInput, freqInput, tMinutesTillTrain);

    console.log(trainData);

    var newTrain = {
        name: trainInput,
        destination: destInput,
        time: trainTimeInput,
        frequency: freqInput,
        arrival: tMinutesTillTrain
    }
    
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    console.log(newTrain.arrival);

    displayTrainData();
})



function displayTrainData() {
    database.ref().on("child_added", function(childSnapshot) {
        // console.log(childSnapshot.val());
    
        var trainInput = childSnapshot.val().name;
        var destInput = childSnapshot.val().destination;
        var trainTimeInput = childSnapshot.val().time;
        var freqInput = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().arrival;
    
        console.log(trainInput);
        console.log(destInput);
        console.log(trainTimeInput);
        console.log(freqInput);
        console.log(nextTrain);
        newInput = $('<tr>');

        newInput.append(
            $("<td>").text(trainInput),
            $("<td>").text(destInput),
            $("<td>").text(freqInput),
            $("<td>").text(trainTimeInput),
            $("<td>").text(nextTrain)
        );
    
        $('#user-train-input').append(newInput);

        // trainData.forEach(function(item) {
        //     console.log(item);
        //     newInput.append('<td>' + item + '</td>');
        // });
    
    // $('#user-train-input').append(
    //     $("<td>").text(trainInput),
    //     $("<td>").text(destInput),
    //     $("<td>").text(trainTimeInput),
    //     $("<td>").text(freqInput),
    //     $("<td>").text(nextTrain)
    // );
    })
}

displayTrainData();