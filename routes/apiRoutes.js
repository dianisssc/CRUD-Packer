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

                res.render("collection", {
                  results
                });

              } else {
                console.log('password not correct!');
              }
            })

        }
      });

  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.BoxCollection.findByIdAndRemove(req.params.id).then(function (dbExample) {
      res.json(dbExample);
    });
  });

};
