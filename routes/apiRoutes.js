const db = require("../models");
const bcrypt = require("bcryptjs");

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
      .then(function (dbBox) {
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
  
  // decrypt and check password

  app.post("api/checkPass", function (req, res) {

    console.log(req.body);

    res.json(req.body);

  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.BoxCollection.findByIdAndRemove(req.params.id).then(function (dbExample) {
      res.json(dbExample);
    });
  });

};
