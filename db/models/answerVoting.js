'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswerVoting = sequelize.define('AnswerVoting', {
    upvote:{
      type: DataTypes.BOOLEAN,
    },
    answerId:  {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId:{
      allowNull: false,
    type: DataTypes.INTEGER,
    }
  }, {});
  AnswerVoting.associate = function(models) {
    // associations can be defined here
    AnswerVoting.belongsTo(models.Answer, {foreignKey:'answerId'});
    AnswerVoting.belongsTo(models.User, {foreignKey:'userId'});
  };
  return AnswerVoting;
};
