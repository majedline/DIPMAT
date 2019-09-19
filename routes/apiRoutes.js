/* eslint-disable camelcase */
var db = require("../models");


module.exports = function(app) {
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

  // This will add a record, list of symptoms, and diagnosis
  app.post("/api/addRecord", function(req, res) {
    var ageInput = new Date().getFullYear() - req.body.user.birthYear;
    var genderInput = convertGender(req.body.user.gender);
    var cityInput = req.body.city.toUpperCase();
    var symptomList = req.body.symptoms;
    var diagnosisList = req.body.diagnosis;

    // build the record
    var recordData = { age: ageInput, gender: genderInput, city: cityInput };

    // add the record, diagnosis and symptoms. Sample input:
    //  {
    //     "user": {"birthYear": 1980, "gender": "female"},
    //     "city": "Milton",
    //     "symptoms": [{"id": 1, "name":"sneeze"}, {"id": 2, "name":"cough"}],
    //     "diagnosis": [{"id": 1, "name":"flu", "accuracy": 20}, {"id": 2, "name":"death", "accuracy": 40}]
    // }
    db.Record.create(recordData).then(function(dbRecord) {
      // add the symptoms of the record
      for (var i = 0; i < symptomList.length; i++) {
        var apiMedicSymptomIDIn = symptomList[i].id;
        var symptomNameIn = symptomList[i].name;
        var recordIDIn = dbRecord.id;

        // build the symptom
        var symptomRecord = {
          apiMedicSymptomID: apiMedicSymptomIDIn,
          name: symptomNameIn,
          RecordId: recordIDIn
        };
        // add the symptom
        db.Symptoms.create(symptomRecord).then(function(dbSymptom) {
          return dbSymptom;
        });
      }

      // add the diagnosis or the record
      for (var i = 0; i < diagnosisList.length; i++) {
        var apiMedicDiagnosisIDIn = diagnosisList[i].id;
        var diagnosisNameIn = diagnosisList[i].name;
        var accuracyIn = diagnosisList[i].accuracy;
        var recordIDIn = dbRecord.id;

        // build the diagnosis
        var diagnosisRecord = {
          apiMedicIssueID: apiMedicDiagnosisIDIn,
          name: diagnosisNameIn,
          accuracy: accuracyIn,
          RecordId: recordIDIn
        };
        // add the diabnosis
        db.Diagnosis.create(diagnosisRecord).then(function(dbDiagnosis) {
          return dbDiagnosis;
        });
      }

      console.log(dbRecord.id);
      res.json(dbRecord);
    });
  });

  // Get all reported records in the city in one day.
  app.get("/api/GetOneDayRecordsInCity/:cityName", function(req, res) {
    var startDate = new Date() - 1000 * 60 * 60 * 24 * 1;
    var endDate = new Date() + 1000 * 60 * 60 * 24 * 1;
    var cityName = req.params.cityName;

    getRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res);
  });

  // get all reported records in the city in one week
  app.get("/api/GetOneWeekRecordsInCity/:cityName", function(req, res) {
    var startDate = new Date() - 1000 * 60 * 60 * 24 * 7;
    var endDate = new Date() + 1000 * 60 * 60 * 24 * 1;
    var cityName = req.params.cityName;

    getRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res);
  });

  // get all diagnosis stats. Sample:
  app.get("/api/getAllDiagnosisStats/", function(req, res) {
    getAllDiagnosisStatsBasedOnCityName("%", res);
  });

  // get all diagnosis stats based on the city naame
  app.get("/api/getAllDiagnosisStatsBasedOnCityName/:cityName", function(
    req,
    res
  ) {
    getAllDiagnosisStatsBasedOnCityName("%" + req.params.cityName + "%", res);
  });

  /*************************************************** */

  // function that actually does the work of getting the diagnosis based on the city name.
  // if the cityNameIn is % then this will return for all cities in the db. Sample:
  // [{
  //   "name": "flu",
  //   "city": "Oakville",
  //   "total": 3,
  //   "percentage": "23.0769"
  //   }]
  function getAllDiagnosisStatsBasedOnCityName(cityNameIn, res) {
    var query =
      "SELECT d1.name, r1.city,\
        COUNT(1) AS total,\
        SUM(oneDigPercentPts) AS percentage\
      FROM dipmat.diagnoses as d1 left join records as r1 on d1.recordID = r1.id\
      CROSS JOIN \
        (\
           SELECT 100 / CAST(COUNT(1) AS DECIMAL(15,4)) AS oneDigPercentPts \
           FROM dipmat.diagnoses as d2 left join records as r2 on d2.recordID = r2.id \
           WHERE r2.city like :cityName\
           ) t\
      WHERE r1.city like :cityName\
      GROUP BY d1.name, r1.city ";

    db.sequelize
      .query(query, {
        replacements: { cityName: cityNameIn },
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(function(dbResult) {
        console.log(dbResult);
        res.json(dbResult);
      });
  }

  // function that actually does the work of getting te record based on the date and city parameter. Sample:
  // IMPORTANT; I AM HAVING TROUBLE WITH START AND END DATE, THAT NEEDS TO BE FIXED AND ADDED.
  // [{
  //   "id": 24,
  //   "age": 39,
  //   "gender": "f",
  //   "city": "Milton",
  //   "createdAt": "2019-09-18T00:50:12.000Z",
  //   "updatedAt": "2019-09-18T00:50:12.000Z"
  //   }]
  function getRecordsInCityBasedOnDateParam(cityName, startDate, endDate, res) {
    console.log(
      "GetRecordsInCityBasedOnDateParam: ",
      new Date(startDate),
      new Date(endDate),
      cityName
    );

    // var d1 = new Date(startDate);
    // var d2 = new Date(endDate);

    db.Record.findAll({
      where: {
        city: cityName.toUpperCase()
        // createdAT: {
        //   $between: [d1, d2]
        // }
      }
    }).then(function(dbRecord) {
      res.json(dbRecord);
    });
  }

  // take a geneder of "male, female, m, f" and converts it to M or F. If passed an undefined value, then it will return M
  function convertGender(input) {
    var loweredInput = input.toLowerCase();
    if (loweredInput === "female") {
      return "F";
    } else {
      return "M";
    }
  }

  /****************END RECORD API**********************/
};
