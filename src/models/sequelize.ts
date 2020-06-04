'use strict';
module.exports = (sequelize, DataTypes) => {
  const sequelize = sequelize.define('sequelize', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  sequelize.associate = function(models) {
    // associations can be defined here
  };
  return sequelize;
};