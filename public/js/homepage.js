
$(document).ready(function () {
  $(".about-me").on("submit", function (event) {
    event.preventDefault();
    var gender = $("#gender").val();
    var birthYear = $("#birthYear").val().trim();
    //Store Data locally For later Post Calls 
    localStorage.setItem("gender", gender);
    localStorage.setItem("birthYear", birthYear);
    //Fade Main Dom and Ajax.get for Body Selection Page
    $("#homePage").animate({ opacity: 0 }, function () {
      $("#homePage").empty();
      $("#preloader").append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div>");
      $("#preloader").animate({ opacity: 1 }, function () {
        location.href = "/getBodyGen";
      });
    });
  });
});