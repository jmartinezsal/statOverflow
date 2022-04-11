'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answers_Voting = sequelize.define('Answers_Voting', {
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
  Answers_Voting.associate = function(models) {
    // associations can be defined here

  };
  return Answers_Voting;
};
