const express = require('express');


const router = express.Router();
const { AnswerVoting } = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions, getPath } = require('./utils');
const { requireAuth } = require('../auth');

router.get("/answers/:id/votes", requireAuth, asyncHandler(async (req, res, next) => {
const answerId = req.params.id;
const userId = res.locals.currUser.id;

let userVote = await AnswerVoting.findOne(
  {
  where: {
    answerId,
    userId: userId
  }
})
res.json({userVote})
}))

router.post("/answer/:id/vote", requireAuth, asyncHandler(async (req, res, next) => {
  const { upvote } = req.body;

  const newVote = await AnswerVoting.build({
    userId: res.locals.currUser.id,
    answerId: req.params.id,
    upvote
  })
  if (newVote) {
    await newVote.save()
  }
  res.json({message:"Success"})
}))

router.put("/answer/:answerId(\\d+)/vote/:voteId", requireAuth, asyncHandler(async (req, res, next) => {

  const { upvote } = req.body;
  console.log(req.body)
  const voteToUpdate = await AnswerVoting.findByPk(req.params.voteId)

  if (voteToUpdate) {
   voteToUpdate.upvote = upvote
    await voteToUpdate.save()
    res.json({ message: "Success", voteToUpdate })
  }
}))

router.delete("/answer/:answerId(\\d+)/vote/:voteId", requireAuth, asyncHandler(async (req, res, next) => {
  const voteToDelete = await AnswerVoting.findByPk(req.params.voteId)
    await voteToDelete.destroy();
    res.send(`The vote has been deleted`);

}))

module.exports = router;
