module.exports = function(sequelize, DataTypes) {
  var Diagnosis = sequelize.define("Diagnosis", {
    apiMedicIssueID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accuracy: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  return Diagnosis;
};
