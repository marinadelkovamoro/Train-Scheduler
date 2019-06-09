console.log("This works!");

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
    firstTrain: firstTrainTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything that was input to the console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // to clear all of the inputs in the input fields
  $("#InputTrainName").val("");
  $("#InputDestination").val("");
  $("#InputFirstTrainTime").val("");
  $("#InputFrequency").val("");

});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // Log train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);


  // Create the new row for each train added
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainTime),
    $("<td>").text(frequency)
  );

  // Append the new row to the table
  $(".table > tbody").append(newRow);
});

