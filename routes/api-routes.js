//require the model

var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Endorse.findAll({}).then(function(dbEndorse) {
      res.json(dbEndorse);
    });
  });

  app.post("/add-endorsement", function(req, res) {
    db.Endorse.create({
      name: req.body.name,
      occupation: req.body.occupation,
    }).then(function(dbEndorse) {
      res.json(dbEndorse);
    });
  });
};
