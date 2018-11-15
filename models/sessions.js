"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define(
    "Sessions",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING,
      startTime: { type: DataTypes.DATE, allowNull: false }
    },
    {}
  );
  Sessions.associate = function(models) {
    // associations can be defined here
  };
  return Sessions;
};
