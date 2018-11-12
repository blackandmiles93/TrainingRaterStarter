"use strict";
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      startTime: { type: DataTypes.DATE, allowNull: false },
      location: DataTypes.STRING
    },
    {}
  );
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};
