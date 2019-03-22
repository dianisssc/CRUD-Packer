const db = require("../models");


module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {

    db.Box.find({}, function (err, boxes) {
      var boxMap = {};

      boxes.forEach(function (user) {
        boxMap[user._id] = user;
      });

      res.send(boxMap);
    });

  });

  // Create a new collection
  app.post("/api/examples", function (req, res) {

    db.BoxCollection.create(req.body)
      .then(function (dbUser) {
        res.json(dbUser);
      })
      .catch(function (err) {
        // If an error occurs, send the error to the client
        res.json(err);
      });

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {

  });

};
