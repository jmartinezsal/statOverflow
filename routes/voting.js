const express = require('express');


const router = express.Router();
const {Question, Answer, AnswerVoting}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions, getPath } = require('./utils');
const { requireAuth } = require('../auth');


//route to show all the questions on a page
router.get("/questions/:id(\\d+)/vote'", asyncHandler(async (req,res, next) =>{
  const voting = await AnswerVoting.findAll({
    where:
      {questionId: req.params.id},
    include: User
  })
  res.render('', voting)
}))

router.post("/answer/:id(\\d+)/vote", requireAuth, asyncHandler(async(req, res, next) =>{

  const {upvote} = req.body;

  const newVote = answersvoting.build({
    userId: res.locals.currUser.id,
    answerId: req.params.id,
    upvote
  })
}))

router.put("/answer/:answerId(\\d+)/vote/:voteId", requireAuth, asyncHandler(async(req, res, next) =>{

  const {upvote} = req.body;
  const voteToUpdate = await AnswerVoting.findByPk(req.params.voteId)

  if(voteToUpdate){
    await voteToUpdate.update(upvote)
    res.json({messag: "Success", voteToUpdate})
  }
}))

router.delete("/answer/:answerId(\\d+)/vote/:voteId", requireAuth, asyncHandler(async(req, res, next) =>{
  const {upvote} = req.body;
  const voteToUpdate = await AnswerVoting.findByPk(req.params.voteId)
  if (voteToUpdate.upvote == upvote){
    await answer.destroy();
    res.send(`The vote has been deleted`);
  }
}))

module.exports = router;
