'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnswersVoting = sequelize.define('AnswersVoting', {
    upvote:{
      allowNull: false,
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
  AnswersVoting.associate = function(models) {
    // associations can be defined here

  };
  return AnswersVoting;
};
