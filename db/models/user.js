'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
    },
    avatarImage: {
      type: DataTypes.STRING,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Question, {foreignKey:"userId"});
    User.hasMany(models.Answer, {foreignKey:"userId"});
    User.belongsTo(models.Answers_Voting, {foreignKey: "userId"});


  };
  return User;
};
