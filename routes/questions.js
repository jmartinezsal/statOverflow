const express = require('express');
const { user } = require('pg/lib/defaults');
const { route } = require('.');
const router = express.Router();
const {Question, Answer}  = require("../db/models")
const { asyncHandler, csrfProtection } = require('./utils');

//route to render the new question form page
router.get("/new-question", asyncHandler (async(req,res) => {
  res.render("question-form")
}))

//route to show all the questions on a page
router.get("/", asyncHandler( async(req,res) => {
  const questions = await Question.findAll()
  console.log(questions)
  res.render("questions_list", {questions})
}))


//route to render a question by id along with the answers
router.get('/:id(\\d+)', asyncHandler( async(req,res) => {
  const question = await Question.findByPk(req.params.id, {
    include: Answer
  })
  
  res.render("specific-question", {question})
}))


//////////////////////////////// As a logged in user

//route as logged in user to submit the new question
router.post('/new-question', asyncHandler(async( req,res) => {
  const {header, content} = req.body
  const question = await Question.create({
    header,
    content
  })
  res.redirect("/")
}))

//route as logged in user to edit a specific question
router.put('/:id(\\d+)', asyncHandler(async(req, res) => {
  const question = await Question.findByPk(req.params.id)

  question.header = req.question.header
  question.content = req.question.content
  await question.save();
  res.send("question has been edited")
}))


//route for a logged in user to delete a question
router.delete('/:id(\\d+)', asyncHandler(async(req,res) => {
  const question = await Question.findByPk(req.params.id)
  question.destroy()
  res.send("question has been deleted")
}))
module.exports = router;
