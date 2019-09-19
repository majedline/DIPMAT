$(document).ready(function () {
    var bodySel;
    $("#bodySymptoms").animate({ opacity: 1 });
    $("#symptomSelect").on('change', function () {
        bodySel = this.value;
        $("#continueSpec").removeClass("disabled");
    });
    $("#ccontinueSymptom").on('click', function () {
        //localStorage.setItem("bodyGen", bodySel);
        $("#bodySymptoms").animate({ opacity: 0 }, function () {
            $("#bodySymptoms").empty();
            $("#preloader").append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div>");

            $("#preloader").animate({ opacity: 1 }, function () {
                var bodyData = {
                    bodySpec: bodySel,
                    userGender: localStorage.getItem("gender")
                }
                $.ajax({
                    type: "post",
                    url: "/getSymptoms/post",
                    data: bodyData
                }).then(function () {
                    location.href = "/getBodySymptoms";
                });
            });
        });
    });
});
