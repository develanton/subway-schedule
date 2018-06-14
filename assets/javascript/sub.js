$(document).ready(function () {

//checking jQuery CDN
  console.log("Its alive");

  // time and Format
  var currentTime = moment();
  var formating = moment(currentTime).format('hh:mm');

  // time check
  console.log(formating);

 //Printing current time
  $('#currentTime').html("<font size='7'><strong><b>"+formating+"</b></strong></font>");
  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBal-rOWAaa2LvNqaBLrKXd19uOw2oLukM",
    authDomain: "subway-schedule.firebaseapp.com",
    databaseURL: "https://subway-schedule.firebaseio.com",
    projectId: "subway-schedule",
    storageBucket: "",
    messagingSenderId: "456104004689"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



  // on click event for adding input data
  $("#add-item").on("click", function (event) {

    //preventing from reload    
    event.preventDefault();

    // retriving the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var initialTime = $("#initial-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //making sure code works till here
    console.log("info: " + trainName);


    // uploading inputs to database
    database.ref().push({

      trainName: trainName,
      destination: destination,
      initialTime: initialTime,
      frequency: frequency,

    })

    // clearing input area

    trainName = $("#train-name").val("");
    destination = $("#destination").val("");
    initialTime = $("#initial-time").val("");
    frequency = $("#frequency").val("");



  })


  database.ref().on('child_added', function(snapshot) {

    console.log(snapshot.val());

    var snapDatabase = snapshot.val();

    var table = $("tbody");
    var rows = $("<tr>");
    var cell = $("<td>");
    
    table.append(rows);
    rows.append(cell);
    cell.text(snapDatabase.trainName);

    var desti = $("<td>");
    desti.text(snapDatabase.destination);
    rows.append(desti);

    var freq = $("<td>");
    freq.text(snapDatabase.frequency+"min");
    rows.append(freq);

    var first = $("<td>");
    first.html(snapDatabase.initialTime);
    rows.append(first);




  })





})