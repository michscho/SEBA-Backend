'use strict';

module.exports = (sequelize, DataTypes) => {
  const seq = sequelize.define('sequelize', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  seq.associate = function(models) {
    // associations can be defined here
  };
  return seq;
};