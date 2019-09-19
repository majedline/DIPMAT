var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("homepage");
  });

  app.get("/diagnosisstats/:cityName", function(req, res) {
    var cityNameIn = req.params.cityName;
    getAllDiagnosisStatsBasedOnCityName(cityNameIn, res);
  });

  app.get("/diagnosisstats/", function(req, res) {
    getAllDiagnosisStatsBasedOnCityName("%", res);
  });

  function getAllDiagnosisStatsBasedOnCityName(cityNameIn, res) {
    var query =
      "SELECT d1.name, r1.city,\
          COUNT(1) AS total,\
          ROUND(SUM(oneDigPercentPts), 0) AS percentage\
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

        var diagnosisList = [];
        var percentageList = [];
        for (var i = 0; i < dbResult.length; i++) {
          diagnosisList.push(dbResult[i].name);
          percentageList.push(dbResult[i].percentage);
        }

        var diagnosisResults = {
          all: dbResult,
          diagnosisListOnly: diagnosisList,
          percentageListOnly: percentageList
        };

        //['Flu', 'Heart Problem', 'Stroke']
        //[20, 10, 5]
        res.render("diagnosisstats", {
          msg: "diagnosisstats!",
          diagnosisResults: diagnosisResults
        });
      });
  }

  // Load example page and pass in an example by id
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
