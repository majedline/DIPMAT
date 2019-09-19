/* eslint-disable camelcase */
var db = require("../models");
var Handlebars = require('handlebars');

//Handlebars function to set index start to 1
Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

module.exports = function(app) {

}
