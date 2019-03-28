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

  // create new box

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
        res.json(box);
      })
      .catch((err) => {
        console.log(err)
      })
  });

  //Update Box 
  app.post("/api/updateBox/:id", function (req, res) {

    let { name, contentArr } = req.body;

    db.Box.findOne({ _id: req.params.id }).then(function (box) {
      if (name === '') {
        name = box.name;
      }
    })
      .then(() => {
        db.Box.findOneAndUpdate({ _id: req.params.id }, { $set: { name, contents: contentArr } })
          .then((box) => {
            res.json(box);
          })
          .catch((err) => {
            console.log(err)
          });
      })
  });

  // decrypt and check password

  app.post("/api/checkPass/", function (req, res) {

    let password = false;

    db.BoxCollection.findOne({ 'name': req.body.collName })
      .populate('box', ['name', '_id', 'boxBelongsTo', 'contents']).then((results) => {

        if (results === null) {
          console.log('Nothing returned!');
        } else {

          bcrypt.compare(req.body.collPass, results.password).then(function (res) {
            if (res === true) {
              password = true;
            }
          })
            .then(() => {
              if (password) {

                res.json(results._id);

              } else {
                res.status(300);

                res.send('Password not correct!');
              }
            })
        }
      });
  });




  // Delete an example by id
  app.delete("/api/deleteCollection/:id", function (req, res) {
    db.BoxCollection.findByIdAndRemove(req.params.id).then(function (dbExample) {
      res.json(dbExample);
    });

  });


  // Delete box by id
  app.delete("/api/deleteBox/:id", function (req, res) {

    console.log('troggered')

    db.Box.findByIdAndRemove(req.params.id).then(function (dbExample) {
      res.json(dbExample);
    });
  });


  // Route for getting all boxes from the db
  app.get("/boxes", function (req, res) {
    // Grab every document in the boxes collection
    db.Box.find(req.params.uniqueId)
      .then(function (dbExample) {
        // If we were able to successfully find boxes, send them back to the client
        res.json(dbExample);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};
