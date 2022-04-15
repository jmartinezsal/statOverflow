const express = require('express');
const {Question, Answer, User}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions } = require('./utils');
const { requireAuth } = require('../auth');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const answerValidators = [
    check('answer')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid response for answer!')
];

router.get('/question/:id(\\d+)', asyncHandler(async(req, res) => {
    const userId = res.locals.user.id;
    const question = await Question.findByPk(req.params.id, {
        include: User
    });
    console.log(question.User.username)
    const answers = await Answer.findAll({ where: { questionId: req.params.id },
    include: User });

    res.render('question', {
        title: question.header,
        question,
        answers,
        userId
    })
}));

// router.get('/question/:id(\\d+)/answer/add', csrfProtection, asyncHandler(async(req, res) => {
//     const question = await Question.findByPk(req.params.id, {
//         include: User
//     });
//     const answers = await Answer.findAll({ where: { questionId: req.params.id },
//     include: User });

//     res.json({
//         message: "Success", 
//         title: question.header,
//         question,
//         answers,
//         csrfToken: req.csrfToken()
//     });
// }));

router.post('/question/:id(\\d+)/answer/add', requireAuth, answerValidators, asyncHandler(async(req, res) => {
    const { answer } = req.body;

    const newAnswer = Answer.build({
        userId: res.locals.user.id,
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

router.put('/question/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, answerValidators, asyncHandler(async(req, res) => {
    const answerToUpdate = await Answer.findByPk(req.params.id);

    checkPermissions(answerToUpdate, res.locals.user);

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

router.delete('/question/:id(\\d+)/answer/delete/:id(\\d+)', requireAuth,  asyncHandler(async(req, res) => {
    const answer = await Answer.findByPk(req.params.id);

    checkPermissions(answer, res.locals.user);

    await answer.destroy();
    res.send(`The answer has been deleted`);
}));

module.exports = router;
