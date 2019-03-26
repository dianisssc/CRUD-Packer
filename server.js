require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
<<<<<<< HEAD

var mongodbURI= process.env.MONGODB_URI || "mongodb://localhost:27017/project2"
mongoose.connect(mongodbURI,
  { useNewUrlParser: true, useCreateIndex: true }
).then(() => console.log('MongoDB Connected'))
=======
//Connect to mongo db 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).
then(() => console.log('MongodB Connected'))
>>>>>>> 5e121a8c143a6f1d9277974014c5e755ce4a92d8
  .catch(err => console.log(err));

// Starting the server, syncing our models ------------------------------------/
app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
