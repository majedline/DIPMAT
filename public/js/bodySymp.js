// Front End JS File for bodySymptoms.handlebars
$(document).ready(function () {
    var sympSel;
    $("#bodySymptoms").animate({ opacity: 1 });
    $(".sympBtn").on('click', function () {
        sympSel = {
            value: this.value,
            name: this.name
        }
        localStorage.setItem("symp1", JSON.stringify(sympSel));
        $("#bodySymptoms").animate({ opacity: 0 }, function () {
            $("#bodySymptoms").empty();
            loadingPage();

            $("#preloader").animate({ opacity: 1 }, function () {
                var postData = {
                    symptoms: JSON.stringify([sympSel.value]),//sympSel.value, //Because this is inital symp, only 1 val is needed
                    gender: localStorage.getItem("gender"),
                    birthYear: localStorage.getItem("birthYear")
                }
                $.ajax({
                    type: "post",
                    url: "/getProposedSymptoms/post",
                    data: postData
                }).then(function () {
                    location.href = "/getProposedSymptoms";
                });
            });
        });
    });
});

var loadingPage = function () {
    $("#preloader").append("<br><br><br><br><br><br><br><br><br><br><div class=\"container center\"><div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div>");
}