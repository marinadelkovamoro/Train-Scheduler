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
$("#add-train-btn").on("click", function(event) {
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

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);
});

