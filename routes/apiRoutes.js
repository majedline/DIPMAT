/* eslint-disable camelcase */
var db = require("../models");
var unirest = require("unirest");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // ----------------------------------------- Api Medic api Routes -----------------------------------------
  //Get Full Symptoms List
  app.get("/getSymptoms", function(req, res) {
    var unirestReq = unirest(
      "GET",
      "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms"
    );

    unirestReq.query({
      format: "json",
      language: "en-gb"
    });

    unirestReq.headers({
      "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
      "x-rapidapi-key": "99a794a1b2msh418e261da3bc802p188864jsn1fd4fddc6a5f"
    });

    unirestReq.end(function(unirestRes) {
      if (unirestRes.error) {
        throw new Error(unirestRes.error);
      }
      var hbsObject = {
        symptoms: unirestRes.body
      };
      res.render("index", hbsObject);
    });
  });

  //Get Proposed Symptoms
  app.get("/getProposedSymptoms", function(req, res) {
    var user = {
      symptoms: req.body.symptoms,
      gender: req.body.gender,
      birthYear: req.body.birthYear
    };

    var unirestReq = unirest(
      "GET",
      "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms/proposed"
    );

    unirestReq.query({
      symptoms: user.symptoms,
      gender: user.gender,
      year_of_birth: user.birthYear,
      language: "en-gb"
    });

    unirestReq.headers({
      "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
      "x-rapidapi-key": "99a794a1b2msh418e261da3bc802p188864jsn1fd4fddc6a5f"
    });

    unirestReq.end(function(unirestRes) {
      if (unirestRes.error) {
        throw new Error(unirestRes.error);
      }

      console.log(unirestRes.body);
      res.json(unirestRes.body);
    });
  });
};
