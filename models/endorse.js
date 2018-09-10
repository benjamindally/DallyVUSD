module.exports = function(sequelize, DataTypes) {
  var Endorse = sequelize.define("Endorse", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },

    occupation: {
      type: DataTypes.STRING, //may need to change this to TEXT?
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  return Endorse;
};
