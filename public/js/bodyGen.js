$(document).ready(function () {
    var bodySel;
    $("#bodyGeneral").animate({ opacity: 1 });
    $("#bodySelect").on('change', function () {
        bodySel = this.value;
        if (this.value === "16") {
            $("#bodyVector").attr("src", "/images/BodyVectors/APB.png");
        } else if (this.value === "7") {
            $("#bodyVector").attr("src", "/images/BodyVectors/ArmsShoulders.png");
        } else if (this.value === "15") {
            $("#bodyVector").attr("src", "/images/BodyVectors/ChestBack.png");
        } else if (this.value === "6") {
            $("#bodyVector").attr("src", "/images/BodyVectors/HeadThroatNeck.png");
        } else if (this.value === "10") {
            $("#bodyVector").attr("src", "/images/BodyVectors/Legs.png");
        } else {
            $("#bodyVector").attr("src", "/images/BodyVectors/skinJGeneral.png");
        }
    });

    $("#continueGen").on('click', function () {
        var bodyData = {
            bodyGen: bodySel
        }
        $("#bodyGeneral").animate({ opacity: 0 }, function () {
            $("#bodyGeneral").empty();
            $("#preloader").append("<div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div>");

            $("#preloader").animate({ opacity: 1 }, function () {
                console.log("good");
                $.ajax({
                    type: "post",
                    url: "/getBodySpecific/post",
                    data: bodyData
                }).then(function (res) {
                    console.log("good" + res);
                    location.href = "/getBodySpecific";
                });
            });
        });
    });
});
