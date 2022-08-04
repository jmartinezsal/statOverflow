'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert("AnswerVotings", [
      {
        upvote: true,
        userId: 1,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: false,
        userId: 5,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 1,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: false,
        userId: 3,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: false,
        userId: 5,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 1,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: false,
        userId: 4,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: false,
        userId: 5,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 1,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 5,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 1,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 5,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 1,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 5,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        upvote: true,
        userId: 1,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 2,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 3,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 4,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        upvote: true,
        userId: 5,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("AnswerVotings", null, {});
  }
};
