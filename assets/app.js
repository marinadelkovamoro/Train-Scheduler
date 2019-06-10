console.log("This works!");

// Current time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDYZqF9ah1xbQdv0PYHCCECcEJXLcTDhvM",
  authDomain: "train-scheduler-marina.firebaseapp.com",
  databaseURL: "https://train-scheduler-marina.firebaseio.com",
  projectId: "train-scheduler-marina",
  storageBucket: "train-scheduler-marina.appspot.com",
  messagingSenderId: "129262385702",
  appId: "1:129262385702:web:89f146f46eca36dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a database variable
var database = firebase.database();

// When the user submits the inputs, the 
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#InputTrainName").val().trim();
  var destination = $("#InputDestination").val().trim();
  var firstTrainTime = $("#InputFirstTrainTime").val().trim();
  var frequency = $("#InputFrequency").val().trim();

  


  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrainTime,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything that was inputted to the console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.firstTrain);


  // to clear all of the inputs in the input fields
  $("#InputTrainName").val("");
  $("#InputDestination").val("");
  $("#InputFrequency").val("");
  $("#InputFirstTrainTime").val("");
});

// Create Firebase event for adding new trains to the database and a row in the html each time a user adds a new train
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().firstTrain;

  // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
  var trainDiff = moment().diff(moment.unix(0), "minutes");

  // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
  var trainRemainder = trainDiff % frequency;

  // subtract the remainder from the frequency, store in var
  var minutesTillArrival = frequency - trainRemainder;

  // add minutesTillArrival to now, to find next train & convert to standard time format
  var nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");


  // Log train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  console.log(trainRemainder);
  console.log(minutesTillArrival);
  console.log(nextTrainTime);


  // Create the new row for each train added
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td class='min'>").text(nextTrainTime),
    $("<td class='min'>").text(minutesTillArrival)
  );

  // Append the new row to the table
  $(".table > tbody").append(newRow);
});


