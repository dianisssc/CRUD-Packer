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

  app.get("/collection/:id", function (req, res) {
    db.BoxCollection.findOne({ _id: req.params.id })
      .populate('box', ['name', '_id', 'boxBelongsTo', 'contents']).then((results) => {
        console.log('results', results);
        res.render("collection", {
          results
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
