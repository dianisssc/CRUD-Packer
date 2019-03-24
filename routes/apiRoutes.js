const db = require("../models");

module.exports = function (app) {
<<<<<<< HEAD
=======
 
>>>>>>> 8b8fa0e16d6d181bdbf55d4ed5c7a13914e52120

  // Create a new collection
  app.post("/api/create/", function (req, res) {

    db.BoxCollection.create(req.body)
      .then(function (dbBox) {
        res.json(dbBox);
      })
      .catch(function (err) {
        // If an error occurs, send the error to the client
        res.json(err);
      });

  });

  //Update Collection 
  app.post("/api/update/:id", function (req, res) {

    db.BoxCollection.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } })
      .then((box) => {
        console.log('Triggered')
        res.json(box);
      })
      .catch((err) => {
        console.log(err)
      })
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.BoxCollection.findByIdAndRemove(req.params.id).then(function (dbExample) {
      res.json(dbExample);
    });
  });

};
