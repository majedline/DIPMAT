$(document).ready(function(){
    $("#bodyGeneral").animate({opacity : 1});
    $("#bodySelect").on('change', function() {
        if (this.value === "16") {
            $("#bodyVector").attr("src","/images/BodyVectors/APB.png");
        }   else if (this.value === "7") {
            $("#bodyVector").attr("src","/images/BodyVectors/ArmsShoulders.png");
        }   else if (this.value === "15") {
            $("#bodyVector").attr("src","/images/BodyVectors/ChestBack.png");
        }   else if (this.value === "6") {
            $("#bodyVector").attr("src","/images/BodyVectors/HeadThroatNeck.png");
        }   else if (this.value === "10") {
            $("#bodyVector").attr("src","/images/BodyVectors/Legs.png");
        }   else {
            $("#bodyVector").attr("src","/images/BodyVectors/skinJGeneral.png");
        }  
    });

});
