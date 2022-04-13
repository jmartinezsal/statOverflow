const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const {Question, Answer, User}  = require("../db/models")
const { asyncHandler, csrfProtection } = require('./utils');


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
  const questions = await Question.findAll({
    include: User
  });

  res.render("index", {questions, title: "Top Questions" })
}))


//********** As a logged in user ************

//route to render the new question form page
router.get("/new-question", csrfProtection, asyncHandler (async(req, res, next) => {
  const question = await Question.build();
  res.render("question-form", {question, csrfToken: req.csrfToken()})
}))

//route as logged in user to submit the new question
router.post("/new-question", addQuestionValidators, csrfProtection, asyncHandler (async(req,res, next) => {
  const {header, content, userId} = req.body

  const question = await Question.build({
    header,
    content,
    userId
  })

  let validating = validationResult(req);

  if (validating.isEmpty()) {
    console.log("question has been validated")
    await question.save()

    res.redirect(`/question/${question.id}`)

  }
  let errors = validating.array().map(err => err.msg);
  res.render("question-form", {errors, question, csrfToken: req.csrfToken()})

}))

//route as logged in user to edit a specific question
router.put('/question/edit/:id(\\d+)', addQuestionValidators, csrfProtection, asyncHandler(async(req, res) => {
  const {header, content} = req.body
  let validating = validationResult(req);

  const question = await Question.findByPk(req.params.id);

  if (validating.isEmpty()) {

  question.header = header
  question.content = content

  await question.save();
  res.redirect(`/questions/${question.id}`)
  }

  let errors = validating.array().map(err => err.msg);

  res.render("question-form", {errors, question, csrfToken: req.csrfToken()})
}))


//route for a logged in user to delete a question
router.delete('/question/delete/:id(\\d+)', csrfProtection, asyncHandler(async(req,res) => {
  const question = await Question.findByPk(req.params.id);
  await question.destroy()
  res.send("question has been deleted")
}))
module.exports = router;
