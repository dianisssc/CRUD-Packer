const db = require("../models");

module.exports = function (app) {
  // Get all examples
  /*app.get("/", function (req, res) {

    db.BoxCollection.find({}, function (err, boxes) {

      res.render("index", {
        msg: "Welcome!",
        boxColl: boxes
      });
    });

  });*/

  // Create a new example
  app.post("/api/examples", function (req, res) {

    db.BoxCollection.create(req.body)
      .then(function (dbBox) {
        res.json(dbBox);
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
