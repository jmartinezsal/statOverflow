'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, {foreignKey: 'userId'});
    Answer.belongsTo(models.Question, {foreignKey:'questionId'});
    Answer.belongsTo(models.Answers_Voting, {foreignKey:'answerId'})

  };
  return Answer;
};
