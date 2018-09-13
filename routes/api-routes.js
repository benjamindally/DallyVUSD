//require the model

var db = require("../models");

module.exports = function(app) {
  app.get("/endorsements", function(req, res) {
    db.Endorse.findAll({}).then(function(dbEndorse) {
      console.log(dbEndorse);
      res.json(dbEndorse);
    });
  });

  app.post("/add-endorsement", function(req, res) {
    console.log(req.body);
    db.Endorse.create({
      name: req.body.name,
      occupation: req.body.occupation,
    }).then(function(dbEndorse) {
      res.json(dbEndorse);
    });
  });
};
