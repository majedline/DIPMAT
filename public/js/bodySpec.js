$(document).ready(function () {
    var bodySel;
    $("#bodySpecific").animate({ opacity: 1 });
    $("#bodySelect").on('change', function () {
        bodySel = this.value;
        $("#continueSpec").removeClass("disabled");
    });
    $("#continueSpec").on('click', function () {
        //localStorage.setItem("bodyGen", bodySel);
        $("#bodySpecific").animate({ opacity: 0 }, function () {
            $("#bodySpecific").empty();
            $("#preloader").append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div>");

            $("#preloader").animate({ opacity: 1 }, function () {
                var bodyData = {
                    bodySpec: bodySel,
                    userGender: localStorage.getItem("gender")
                }
                console.log(bodyData)
                $.ajax({
                    type: "post",
                    url: "/getBodySymptoms/post",
                    data: bodyData
                }).then(function () {
                    console.log("Test1")
                    location.href = "/getBodySymptoms";
                });
            });
        });
    });
});