const db = require("../models");

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

  app.get("/example/:id", function (req, res) {
        db.BoxCollection.findOne({ _id: req.params.id})
        .populate('box', ['name', '_id', 'boxBelongsTo', 'contents']).then((results) => {
          console.log('results', results);
          res.render("collection", {
           results
          });
        })
});

  // Load example page and pass in an example by id
  /*app.get("/example/:id", function (req, res) {

    db.BoxCollection.findOne({ _id: req.params.id }, function (err, boxes) {
      console.log('test', boxes)
      res.render("example", {
        example: boxes
      });
    });

  });*/

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
