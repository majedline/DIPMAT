$(document).ready(function () {
    $("#bodySpecific").animate({ opacity: 1 });
    $("#continueGen").on('click', function () {
        //localStorage.setItem("bodyGen", bodySel);
        $("#bodyGeneral").animate({ opacity: 0 }, function () {
            $("#bodyGeneral").empty();
            $("#preloader").append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div>");

            $("#preloader").animate({ opacity: 1 }, function () {
                location.href = "/getBodySpecific/7"//? + bodySel;
            });
        });
    });
});
