$(document).ready(function () {
    var bodySel;
    $("#bodyGeneral").animate({ opacity: 1 });
    $("#bodySelect").on('change', function () {
        bodySel = this.value;
        $("#continueGen").removeClass("disabled");
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
        localStorage.setItem("bodyGen", bodySel);
        var bodyData = {
            bodyGen: bodySel
        }
        $("#pageFooter").animate({ opacity: 0 });
        $("#bodyGeneral").animate({ opacity: 0 }, function () {
            $("#bodyGeneral").empty();
            loadingPage();

            $("#preloader").animate({ opacity: 1 }, function () {
                $.ajax({
                    type: "post",
                    url: "/getBodySpecific/post",
                    data: bodyData
                }).then(function () {
                    location.href = "/getBodySpecific";
                });
            });
        });
    });
});

var loadingPage = function (){
    $("#preloader").append("<br><br><br><br><br><br><br><br><br><br><div class=\"container center\"><div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div>");
  }
