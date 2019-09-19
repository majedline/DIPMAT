// Front End JS File for diagPage.handlebars
$(document).ready(function () {
    $("#diagPage").animate({ opacity: 1 });

    var symp1 = JSON.parse(localStorage.getItem("symp1"));
    //var symp2 = JSON.parse(localStorage.getItem("symp2"));
    
    var sympPost= {
        id: parseInt(symp1.value),
        name: symp1.name
    }
    console.log(sympPost);
    
    var diagnosis = {
        id: parseInt($("#diag1").attr("value")),
        name: $("#diag1").attr("name"),
        accuracy: parseInt($("#diag1").attr("acc"))
    }
    console.log(diagnosis);
    console.log(symp1);

    var postData = {
        birthYear: localStorage.getItem("birthYear"),//String
        gender: localStorage.getItem("gender"),
        symptoms: JSON.stringify([sympPost]),
        diagnosis: JSON.stringify([{id: 1, name:"flu", accuracy: 20}]),
        city: "Toronto"
    }

    $.ajax({
        type: "post",
        url: "/api/addRecord",
        data: postData
    })

});
