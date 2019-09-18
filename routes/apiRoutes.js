/* eslint-disable camelcase */
var db = require("../models");
var unirest = require("unirest");

module.exports = function(app) {
  //Get Body Locations (General)
  app.get("/getBodyGen", function(req, res) {
    var unirestReq = unirest(
      "GET",
      "https://priaid-symptom-checker-v1.p.rapidapi.com/body/locations"
    );

    unirestReq.query({
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
        locations: unirestRes.body
      };
      res.render("bodyGeneral", hbsObject);
    });
  });

  //Get Body Locations (Sub Locations)
  app.get("/getBodySpecific", function(req, res) {
    var unirestReq = unirest(
      "GET",
      "https://priaid-symptom-checker-v1.p.rapidapi.com/body/locations/15"
    );

    unirestReq.query({
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

      res.render("bodyGeneral", hbsObject);
    });
  });

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
