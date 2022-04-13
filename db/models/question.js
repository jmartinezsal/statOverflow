'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    header:{
      allowNull: false,
      type:  DataTypes.STRING,
    },
    content:{
      allowNull: false,
      type:  DataTypes.TEXT,
    },
    userId:{
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, {foreignKey: 'userId'});
    Question.hasMany(models.Answer, {foreignKey:'questionId'});
  };
  return Question;
};
