// Create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const comments = require('./comments.json');

// Create a static file server
app.use(express.static('public'));

// Parse all request bodies as JSON
app.use(bodyParser.json());

// Return all comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

// Add a new comment
app.post('/api/comments', function(req, res) {
  // Get the new comment data from the request body
  const newComment = req.body;

  // Add a "id" property to the new comment
  newComment.id = comments.length + 1;

  // Add the new comment to the "comments" array
  comments.push(newComment);

  // Save the updated comments to the file
  fs.writeFile("./comments.json", JSON.stringify(comments), function(err) {
    if (err) {
      // If an error occurred, send a 500 error to the client
      res.status(500).json({
        message: "An error occurred"
      });
    } else {
      // Send the new comment back to the client
      res.json(newComment);
    }
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});