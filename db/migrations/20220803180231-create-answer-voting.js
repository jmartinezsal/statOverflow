'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AnswerVotings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upvote: {
        type: Sequelize.BOOLEAN
      },
      answerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model:'Answers'}
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{model: 'Users'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AnswerVotings');
  }
};
