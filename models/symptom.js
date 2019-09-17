module.exports = function(sequelize, DataTypes) {
  var Symptoms = sequelize.define("Symptoms", {
    apiMedicSymptomID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Symptoms;
};
