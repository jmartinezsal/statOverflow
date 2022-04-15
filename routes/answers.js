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
    let userId;

    if(res.locals.user){
        userId = res.locals.user.id;
    }

    const question = await Question.findByPk(req.params.id, {
        include: User
    });


    const answers = await Answer.findAll(
    {
        where:
            { questionId: req.params.id },
        include: User
    });

    res.render('question', {
        title: `statOverflow - ${question.header}`,
        question,
        answers,
        userId
    })
}));

//route for a logged in user to delete a question
// router.delete('/question/:id(\\d)+/delete', asyncHandler(async(req,res, next) => {
//     const question = await Question.findByPk(req.params.id);
//     const answers = await Answer.findAll({
//       where: {
//         questionId: req.params.id
//       }
//     })

//     if(answers){
//         answers.forEach(async answer => await answer.destroy());
//     }

//     await question.destroy();

//     res.json({message:'Success in question page', question})
//     res.redirect('/');
//   }));

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
        res.json({message: "Success", newAnswer})
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('question', {
            title: 'Add Answer',
            answer,
            submit,
            errors,
            csrfToken: req.csrfToken()
        });
    }

}));

// router.get('/question/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
//     const answer = await Answer.findByPk(req.params.id);

//     checkPermissions(answer, res.locals.user);

//     res.render('answer-edit', {
//         title: 'Edit Answer',
//         answer,
//         csrfToken: req.csrfToken()
//     });
// }));

router.put('/question/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, answerValidators, asyncHandler(async(req, res) => {
    const answerToUpdate = await Answer.findByPk(req.params.id);

    checkPermissions(answerToUpdate, res.locals.user);

    const answer = req.body.answer;

    const validatorErrors = validationResult(req);
    console.log()
    if (validatorErrors.isEmpty()) {
        await answerToUpdate.update(answer);
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
