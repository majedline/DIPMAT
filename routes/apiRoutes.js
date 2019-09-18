/* eslint-disable camelcase */
var db = require("../models");
var unirest = require("unirest");
var rapidapiKey = "392e514bc5mshf76ed8b87ea0f07p1a1f82jsn203533661587";
var tempObj = {};

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
      "x-rapidapi-key": rapidapiKey
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
  app.post("/getBodySpecific/post", function(req, res) {
    console.log("good");
    var bodyGen = req.body.bodyGen;
    var URL =
      "https://priaid-symptom-checker-v1.p.rapidapi.com/body/locations/" +
      bodyGen;
    var unirestReq = unirest("GET", URL);

    unirestReq.query({
      language: "en-gb"
    });

    unirestReq.headers({
      "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
      "x-rapidapi-key": rapidapiKey
    });

    unirestReq.end(function(unirestRes) {
      if (unirestRes.error) {
        throw new Error(unirestRes.error);
      }
      tempObj = {
        locations: unirestRes.body
      };
      console.log(unirestRes.body);
      res.json({ id: 200 });
    });
  });

  app.get("/getBodySpecific", function(req, res) {
    res.render("bodySpecific", tempObj);
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
      "x-rapidapi-key": rapidapiKey
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
      "x-rapidapi-key": rapidapiKey
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
