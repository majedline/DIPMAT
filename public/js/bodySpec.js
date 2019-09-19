$(document).ready(function () {
    var bodySel;
    bodyGenInit(localStorage.getItem("bodyGen"))

    $("#bodySpecific").animate({ opacity: 1 });
    $("#bodySelect").on('change', function () {
        bodySel = this.value;
        $("#continueSpec").removeClass("disabled");
    });
    $("#continueSpec").on('click', function () {
        $("#pageFooter").animate({ opacity: 0 });
        $("#bodySpecific").animate({ opacity: 0 }, function () {
            $("#bodySpecific").empty();
            loadingPage();

            $("#preloader").animate({ opacity: 1 }, function () {
                var bodyData = {
                    bodySpec: bodySel,
                    userGender: localStorage.getItem("gender")
                }

                $.ajax({
                    type: "post",
                    url: "/getBodySymptoms/post",
                    data: bodyData
                }).then(function () {
                    location.href = "/getBodySymptoms";
                });
            });
        });
    });
});

var loadingPage = function () {
    $("#preloader").append("<br><br><br><br><br><br><br><br><br><br><div class=\"container center\"><div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div>");
}

var bodyGenInit = function (value) {
    if (value === "16") {
        $("#bodyVector").attr("src", "/images/BodyVectors/APB.png");
    } else if (value === "7") {
        $("#bodyVector").attr("src", "/images/BodyVectors/ArmsShoulders.png");
    } else if (value === "15") {
        $("#bodyVector").attr("src", "/images/BodyVectors/ChestBack.png");
    } else if (value === "6") {
        $("#bodyVector").attr("src", "/images/BodyVectors/HeadThroatNeck.png");
    } else if (value === "10") {
        $("#bodyVector").attr("src", "/images/BodyVectors/Legs.png");
    } else {
        $("#bodyVector").attr("src", "/images/BodyVectors/skinJGeneral.png");
    }
}