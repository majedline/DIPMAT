var http = require("https");

var getSymptoms = function() {
  var options = {
    method: "GET",
    hostname: "priaid-symptom-checker-v1.p.rapidapi.com",
    port: null,
    path: "/symptoms?format=json&language=en-gb",
    headers: {
      "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
      "x-rapidapi-key": "99a794a1b2msh418e261da3bc802p188864jsn1fd4fddc6a5f"
    }
  };

  var req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      var jsonObj = JSON.parse(body.toString());
      return jsonObj;
    });
  });
  req.end();
};

module.exports = getSymptoms;
