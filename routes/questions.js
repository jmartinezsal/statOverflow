const express = require('express');
const { user } = require('pg/lib/defaults');
const { route } = require('.');
const router = express.Router();
const {Question, Answer}  = require("../db/models")
const { asyncHandler, csrfProtection } = require('./utils');
const { check, validationResult } = require('express-validator');


const addQuestionValidators = [
  check('header')
  .exists({checkFalsy: true})
  .withMessage("Please provide a topic for your question")
  .isLength({max:255})
  .withMessage("your question topic can't be more than 255 characters"),
  check('content')
  .exists({checkFalsy: true})
  .withMessage("Please provide a question")
]

//route to render the new question form page
router.get("/new-question", csrfProtection, asyncHandler (async(req,res) => {
  res.render("question-form", {csrfToken: req.csrfToken()})
}))

//route to show all the questions on a page
router.get("/", asyncHandler( async(req,res) => {
  const questions = await Question.findAll()
  console.log(questions)
  res.render("questions_list", {questions})
}))


//route to render a question by id along with the answers
router.get('/:id(\\d+)', asyncHandler( async(req,res,next) => {
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
  
  res.render("questionById", {question})
}))


//////////////////////////////// As a logged in user

//route as logged in user to submit the new question
router.post("/new-question", addQuestionValidators, csrfProtection, asyncHandler (async(req,res, next) => {
  const {header, content} = req.body
  
  const question = await Question.build({
    header,
    content
  })
  console.log(question)
  let validating = validationResult(req)
  console.log("these are the errors", validating)
  if (validating.isEmpty()) {
    console.log("question has been validated")
    await question.save()
    res.redirect(`/questions/${question.id}`)
    
  }
  let errors = validating.array().map(err => err.msg);
  res.render("question-form", {errors, csrfToken: req.csrfToken(), question})

}))

//route as logged in user to edit a specific question
router.put('/:id(\\d+)', addQuestionValidators, csrfProtection, asyncHandler(async(req, res) => {
  const {header, content} = req.body
  let validating = validationResult(req)
  const question = await Question.findByPk(req.params.id)

  if (validating.isEmpty) {

  question.header = req.question.header
  question.content = req.question.content

  await question.save();
  res.redirect(`/questions/${question.id}`)
  }

  let errors = validationErrors.array().map(err => err.msg);
  
  res.render("question-form", {errors, csrfToken: req.csrfToken(), question})
}))


//route for a logged in user to delete a question
router.delete('/:id(\\d+)', csrfProtection, asyncHandler(async(req,res) => {
  const question = await Question.findByPk(req.params.id)
  await question.destroy()
  res.send("question has been deleted")
}))
module.exports = router;
