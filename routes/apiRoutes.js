/* eslint-disable camelcase */
var db = require("../models");
var unirest = require("unirest");

module.exports = function (app) {
  // // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function (req, res) {
  //   db.Example.create(req.body).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function (
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });

  /****************RECORD API**********************/
  app.post("/api/addRecord", function (req, res) {
    var ageInput = req.body.age;
    var genderInput = convertGender(req.body.gender);
    var cityInput = req.body.city;

    var recordData = { age: ageInput, gender: genderInput, city: cityInput };

    db.Record.create(recordData).then(function (dbRecord) {
      res.json(dbRecord);
    });
  });

  app.get("/api/GetOneDayRecordsInCity/:cityName", function (req, res) {
    var startDate = (Date.now()) - 1;
    var endDate = Date.now()+1;
    var cityName = req.params.cityName;

    GetRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res);
  });

  app.get("/api/GetOneWeekRecordsInCity/:cityName", function (req, res) {
    var startDate = (Date.now()) - 7;
    var endDate = Date.now()+1;
    var cityName = req.params.cityName;

    GetRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res);
  });

  function GetRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res) {
    console.log("GetRecordsInCityBasedOnDateParam: " + startDate, endDate, cityName);
    db.Record.findAll({
      where: {
        city: cityName
        // createdAt: {
        //   $between: [startDate, endDate]
        // }
      }
    }).then(function (dbRecord) {
      res.json(dbRecord);
    });
  }

  function convertGender(input) {
    var loweredInput = input.toLowerCase();
    if (loweredInput === "female") {
      return "f";
    } else {
      return "m";
    }
  }

  /****************END RECORD API**********************/








  // ----------------------------------------- Api Medic api Routes -----------------------------------------
  //Get Full Symptoms List
  app.get("/getSymptoms", function (req, res) {
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

    unirestReq.end(function (unirestRes) {
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
  app.get("/getProposedSymptoms", function (req, res) {
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

    unirestReq.end(function (unirestRes) {
      if (unirestRes.error) {
        throw new Error(unirestRes.error);
      }

      console.log(unirestRes.body);
      res.json(unirestRes.body);
    });
  });
};
