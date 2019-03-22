const db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!",
      boxColl: db.BoxCollection
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    res.render("example", {
      examples: db.Box
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
