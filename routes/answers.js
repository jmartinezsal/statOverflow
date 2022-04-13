const express = require('express');
const {Question, Answer, User}  = require("../db/models")
const { asyncHandler, csrfProtection, checkPermissions } = require('./utils');
const { requireAuth } = require('../auth');
const { check } = require('express-validator');

const router = express.Router();

const answerValidators = [
    check('answer')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid response for answer!')
];

router.get('/question/:id(\\d+)', asyncHandler(async(req, res) => {
    
    const question = await Question.findByPk(req.params.id, {
        include: User
    });
    const answers = await Answer.findAll({ where: { questionId: req.params.id },
    include: User });

    res.render('question', {
        title: question.header,
        question,
        answers
    })
}));

// router.get('/question/:id(\\d+)/answer/add', csrfProtection, (req, res) => {
//     res.render('answer-add', {
//         title: 'Add Answer',
//         csrfToken: csrfToken()
//     });
// });

// router.post('/question/:id(\\d+)/answer/add', requireAuth, csrfProtection, answerValidators, asyncHandler(async(req, res) => {
//     const { answer } = req.body;

//     const newAnswer = Answer.build({
//         userId: res.locals.user.id,
//         questionId: parseInt(req.params.id, 10),
//         answer
//     });

//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {
//         await newAnswer.save();
//         res.redirect(`/question/${parseInt(req.params.id, 10)}`)
//     } else {
//         const errors = validatorErrors(req);
//         res.render('answer-add', {
//             title: 'Add Answer',
//             answer,
//             errors,
//             csrfToken: req.csrfToken()
//         });
//     }

// }));

// router.get('/question/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
//     const answerId = parseInt(req.params.id, 10);
//     const answer = await Answer.findByPk(answerId);

//     checkPermissions(answer, res.locals.user);

//     res.render('answer-edit', {
//         title: 'Edit Answer',
//         answer,
//         csrfToken: req.csrfToken()
//     });
// }));

// router.post('/question/:id(\\d+)/answer/edit/:id(\\d+)', requireAuth, csrfProtection, answerValidators, asyncHandler(async(req, res) => {
//     const answerId = parseInt(req.params.id, 10);
//     const answerToUpdate = await Answer.findByPk(answerId);

//     checkPermissions(answerToUpdate, res.locals.user);

//     const answer = req.body.answer;

//     const validatorErrors = validationResult(req);

//     if (validatorErrors.isEmpty()) {
//         await answerToUpdate.update(answer);
//         res.redirect(`/question/${answer.questionId}`)
//     } else {
//         const errors = validatorErrors.array().map((error) => error.msg);
//         res.render('answer-edit', {
//             title: 'Edit Answer',
//             answer: answer,
//             errors,
//             csrfToken: req.csrfToken()
//         });
//     }
// }));

// router.post('/question/:id(\\d+)/answer/delete/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async(req, res) => {
//     const answerId = parseInt(req.params.id, 10);
//     const answer = await Answer.findByPk(answerId);

//     checkPermissions(answer, res.locals.user);

//     await answer.destroy();
//     res.redirect(`/question/${answer.questionId}`);
// }));

module.exports = router;