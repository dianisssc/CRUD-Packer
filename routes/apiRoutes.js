const db = require("../models");

module.exports = function (app) {

  // Create a new collection
  app.post("/api/create/", function (req, res) {

    db.BoxCollection.create(req.body)
      .then(function (dbBox) {
        res.json(dbBox);
      })
      .catch(function (err) {
        res.json(err);
      });

  });

  app.post("/createBox/:id", function (req, res) {

    db.Box.create(req.body)
      .then(function (dbBox){
        console.log('dbBox', dbBox);
        return db.BoxCollection.findOneAndUpdate({ _id: req.params.id }, { $push: { box: dbBox._id } }, { new: true });
      })
      .then(function (dbBox) {
        res.json(dbBox);
      })
      .catch(function (err) {
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
