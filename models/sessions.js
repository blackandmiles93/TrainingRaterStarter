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
  // this will create a foreign key in the ratings table
  Sessions.associate = function(models) {
    models.Sessions.hasMany(models.Ratings, {
      foreignKey: "sessionId",
      sourceKey: "id"
    });
  };
  return Sessions;
};
