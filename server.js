var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//port used
var PORT = process.env.PORT || 3000;

//require model for syncing
var db = require("./models");

//using body-parster with express
app.use(bodyParser.urlencoded({ extended: true }));
//parse json
app.use(bodyParser.json());

//Static directory
app.use(express.static("public"));

//the route that will be followed
require("./routes/api-routes.js")(app);

//Sync sequelize model and start express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
