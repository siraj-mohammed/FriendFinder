// ===============================================================================
// LOAD DATA
// ===============================================================================

var friendsArray = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    var userData = req.body; // All of the data received via POST
    var userScores = userData.scores; // The scores array from the received data
    var friendMatch; // The best match, this friend from the friendsArray will be returned as a response to POST
    
    var friendDifference = 41; // Used to check if a given friend is the best match yet. 
    // Initial value is set to 41 as max difference between any two friends is (5 - 1) * 10 = 40

    var totalDifference; // Tracks the score difference between the user and each friend in the database

    for (var i = 0; i < friendsArray.length; i++){ // Loop through the friendsArray
        totalDifference = 0; // Reset total score difference for every friend in the list
        for (var j = 0; j < 10; j++){ // Loop through each score in the scores array
            totalDifference += Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(userScores[j]));
        }
        //Test total score difference for each friend - uncomment lines 39, 40 and 52
        //console.log("Friend Name: " + friendsArray[i].name);
        //console.log("Total Difference: " + totalDifference);
        
        // Once totalDifference between user and current friend in the list is calculated..
        if (totalDifference <= friendDifference){ // If the current friend is the best match so far
            friendMatch = friendsArray[i]; // Return this friend as the best match
            friendDifference = totalDifference; // Set tracker to the lowest difference found
        }
    }

    res.json(friendMatch);
    friendsArray.push(userData);

    //console.log("--------------------------------------------------------");
  });
};
