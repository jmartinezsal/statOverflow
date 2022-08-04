const express = require('express');


const router = express.Router();
const {User, AnswerVoting}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions, getPath } = require('./utils');
const { requireAuth } = require('../auth');


//route to show all the votes for answers
router.get("/questions/:id(\\d+)", asyncHandler(async (req,res, next) =>{
  let userId;
  let
    if(res.locals.currUser){
        userId = res.locals.currUser.id;
    }

    const answers = await AnswerVoting.findAll({
      where: req.params.id
    })

  const voting = await AnswerVoting.findAll({
    where:
      {
        answerId: req.params.id,
    },
    include: User
  })
  console.log(voting)
  res.render('question',{ voting })
}))

router.post("/answer/:id(\\d+)/vote", requireAuth, asyncHandler(async(req, res, next) =>{

  const {upvote} = req.body;

  const newVote = AnswerVoting.build({
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
    res.json({message: "Success", voteToUpdate})
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
