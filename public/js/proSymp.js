$(document).ready(function () {
    var initSymp = JSON.parse(localStorage.getItem("symp1"));
    var sympArr = [];
    $("#propSymptoms").animate({ opacity: 1 });
    $(".sympBtn").on('click', function () {
        sympSel = {
            value: this.value,
            name: this.name
        }
        sympArr = [initSymp.value,sympSel.value]
        localStorage.setItem("symp2", JSON.stringify(sympSel));
        $("#propSymptoms").animate({ opacity: 0 }, function () {
            $("#propSymptoms").empty();
            loadingPage();

            $("#preloader").animate({ opacity: 1 }, function () {
                console.log(JSON.stringify(sympArr));
                
                /* var postData = {
                    symptoms: JSON.stringify(sympArr),//sympSel.value, //Because this is inital symp, only 1 val is needed
                    gender: localStorage.getItem("gender"),
                    birthYear: localStorage.getItem("birthYear")
                }
                $.ajax({
                    type: "post",
                    url: "/getProposedSymptoms/post",
                    data: postData
                }).then(function () {
                    location.href = "/getDiag";
                }); */
            });
        });
    });
});

var loadingPage = function () {
    $("#preloader").append("<br><br><br><br><br><br><br><br><br><br><div class=\"container center\"><div class=\"preloader-wrapper big active\"><div class=\"spinner-layer spinner-blue-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div>");
}