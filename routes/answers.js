const express = require('express');
const {Question, Answer, User, AnswerVoting, sequelize}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions } = require('./utils');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const answerValidators = [
    check('answer')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid response for answer!')
];

router.get('/questions/:id(\\d+)', asyncHandler(async(req, res) => {
    let userId;
    //Object to store the votings of each answer
    let answerVotings = {};
    let voteStatus = {};
    if(res.locals.currUser){
        userId = res.locals.currUser.id;
    }

    const question = await Question.findByPk(req.params.id)

    const questionUser = await User.findByPk(question.userId,{
        include: [{
            model: Answer,
            attributes: []
        },
        {
            model: Question,
            attributes: []

        }],
        attributes: [
            'id',
            'username',
            'avatarImage',
            [sequelize.fn("COUNT", sequelize.col("Questions.userId")), "questionCnt"],
            [sequelize.fn("COUNT", sequelize.col("Answers.userId")), "answerCnt"]
        ],
        group: ["User.id"]


    })

        const answers = await Answer.findAll(
            {
                where:
                { questionId: req.params.id },
                include: [User, AnswerVoting],

    });

    answers.forEach((answer, idx) =>(
        answerVotings[answer.id] = answer.dataValues.AnswerVotings
        ))

    for (let i=0; i < Object.values(answerVotings).length; i++){
        let currKey = Object.keys(answerVotings)[i];
        let currAnswer = Object.values(answerVotings)[i];
        let counter = 0;
        let value = 0;
        let voted = false;
        let type = null;

        for( let vote of currAnswer ){
            let currVote = vote.dataValues
            if( currVote.upvote){
                value++;

            } else{
                value--;
            }
            if(currVote.userId === userId){
                voted= true
                type= currVote.upvote
            }
            counter++;
        }

        voteStatus[currKey] = {counter, value, voted, type, id: currKey}
    }
    res.render('question', {
        title: `${question.header}`,
        question,
        answers,
        userId,
        voteStatus,
        questionUser: questionUser.dataValues
    })
}));



router.post('/questions/:id(\\d+)/answer/add', requireAuth, answerValidators, asyncHandler(async(req, res) => {
    const { answer } = req.body;

    const newAnswer = Answer.build({
        userId: res.locals.currUser.id,
        questionId: req.params.id,
        answer
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await newAnswer.save();
        res.json({ message: "Success", newAnswer })
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('question', {
            title: 'Add Answer',
            answer,
            errors,
        });
    }

}));

router.put('/questions/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, answerValidators, asyncHandler(async(req, res) => {
    const answerToUpdate = await Answer.findByPk(req.params.id);

    checkPermissions(answerToUpdate, res.locals.currUser);

    const { answer } = req.body;

    const ans = {
        answer
    }

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await answerToUpdate.update(ans);
        res.json({message: "Success", answerToUpdate})
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answer-edit', {
            title: 'Edit Answer',
            answer: answer,
            errors,
        });
    }
}));

router.delete('/questions/:id(\\d+)/answer/delete/:id(\\d+)', requireAuth,  asyncHandler(async(req, res) => {
    const answer = await Answer.findByPk(req.params.id);

    checkPermissions(answer, res.locals.currUser);

    await answer.destroy();
    res.send(`The answer has been deleted`);
}));

module.exports = router;
