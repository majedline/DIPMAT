
$(document).ready(function () {
  //Event To check if Gender was selected
  $("#gender").on('change', function () {
    $("#contBtn").removeClass("disabled");
  });

  $(".about-me").on("submit", function (event) {
    event.preventDefault();
    var gender = $("#gender").val();
    var birthYear = $("#birthYear").val().trim();
    console.log(birthYear)
    if (gender === null || gender === "Perfer Not To Say") {
      gender = "Male"
    }
    if (birthYear === "") {
      birthYear = 2000
    }
    //Store Data locally For later Post Calls 
    localStorage.setItem("gender", gender);
    localStorage.setItem("birthYear", birthYear);
    $("#pageFooter").animate({ opacity: 0 });
    //Fade Main Dom and Ajax.get for Body Selection Page
    $("#homePage").animate({ opacity: 0 }, function () {
      $("#homePage").empty();
      loadingPage();
      $("#preloader").animate({ opacity: 1 }, function () {
        location.href = "/getBodyGen";
      });
    });
  });
});

var loadingPage = function (){
  $("#preloader").append("<br><br><br><br><br><br><br><br><br><br><div class=\"container center\"><div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div>");
}