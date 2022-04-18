const express = require('express');
const { check, validationResult } = require('express-validator');
const { user } = require('pg/lib/defaults');

const router = express.Router();
const {Question, Answer, User, sequelize}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions, getPath } = require('./utils');

const addQuestionValidators = [
  check('header')
  .exists({checkFalsy: true})
  .withMessage("Please provide a topic for your question")
  .isLength({max:255})
  .withMessage("your question topic can't be more than 255 characters"),
  check('content')
  .exists({checkFalsy: true})
  .withMessage("Please provide content for your question")
]


//route to show all the questions on a page
router.get("/", asyncHandler(async(req, res, next) => {
  let userId;
  const path = req.path;
  if(res.locals.currUser){
    userId = res.locals.currUser.id

    const questions = await Question.findAll({
      include: [{
      model: Answer,
      attributes: []
      },
      {
        model: User,
        attributes: [
          'id',
          'avatarImage',
          'username'
        ]
      }],
      attributes:[
        'id',
        'content',
        'header',
        'updatedAt',
        [sequelize.fn("COUNT", sequelize.col("Answers.questionId")), "answerCnt"]],
        group: ["Question.id", "User.id" ],
        order: [[sequelize.fn("COUNT", sequelize.col("Answers.questionId")), 'DESC']],
        // limit: 10
    })

    res.render("index",  { path, userId, questions, title: "Top Questions"})
  }
  else{
    res.render("welcome-page",  { path, title: "statOverflow"})
  }
}))

router.get("/questions", asyncHandler(async(req, res, next) => {
  let userId;
  const path = req.path;

  if(res.locals.currUser){
    userId = res.locals.currUser.id
  }
  const questions = await Question.findAll({
    include: [{
    model: Answer,
    attributes: []
    },{
      model: User,
      attributes: [
        'avatarImage',
        'username',
        'id'
      ]
    }
  ],
    attributes:[
      'id',
      'content',
      'header',
      'updatedAt',
      [sequelize.fn("COUNT", sequelize.col("Answers.questionId")), "answerCnt"]
          ],
      group: ["Question.id", "User.id"],
    order: [
    ['updatedAt', 'DESC']
  ]
  });

  res.render("index",  { path, userId, questions, title: "All Questions"})
}))

//********** As a logged in user ************

//route to render the new question form page
router.get("/new-question", csrfProtection, asyncHandler (async(req, res, next) => {
  let path = req.path;
  const question = await Question.build();

  res.render("question-form", {path, question, csrfToken: req.csrfToken()})
}))

//route as logged in user to submit the new question
router.post("/new-question", addQuestionValidators, csrfProtection, asyncHandler (async(req,res, next) => {
  const {header, content, userId} = req.body
  const path = req.path;

  const question = await Question.build({
    header,
    content,
    userId
  })

  let validating = validationResult(req);

  if (validating.isEmpty()) {
    console.log("question has been validated")
    await question.save()
    res.redirect(`/questions/${question.id}`)

   } else {
    let errors = validating.array().map(err => err.msg);
    res.render("question-form", {path, errors, question, csrfToken: req.csrfToken()})
   }

}))

//route as logged in user to edit a specific question
router.put('/questions/:id(\\d+)/edit', asyncHandler(async(req, res) => {
  let path = req.path;
  const question = await Question.findByPk(req.params.id,{
    include: User
  });

  question.header = req.body.header;
  question.content = req.body.content;

  await question.save();

  res.json({
    message: "Success",
    question,
    path
  });

}));


//route for a logged in user to delete a question
router.delete('/questions/:id(\\d+)/delete', asyncHandler(async(req,res, next) => {
  let path = req.body;
  const question = await Question.findByPk(req.params.id);
  const answers = await Answer.findAll({
    where: {
      questionId: req.params.id
    }
  })

  answers.forEach(async answer => await answer.destroy());

  await question.destroy();
  res.json({message:'Success', path});
}));

module.exports = router;
