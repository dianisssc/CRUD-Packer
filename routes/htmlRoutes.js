const db = require("../models");
const path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {

    db.BoxCollection.find({}, function (err, boxes) {
      res.render("index", {
        msg: "Welcome!",
        boxColl: boxes
      });
    });

  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {

    db.BoxCollection.findOne({ _id: req.params.id }, function (err, boxes) {
      console.log('test', boxes)
      res.render("example", {
        example: boxes
      });
    });

  });


  app.get("/manage", function(req, res) {
    db.BoxCollection.findOne({ _id: req.params.id }, function (err, boxes) {
      console.log('test', boxes)
      res.render("manage", {
        example: boxes
      });
    });
   
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
