const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User, Question, Answer, sequelize } = require('../db/models');
const { loginUser, logoutUser} = require('../auth');
const { asyncHandler, csrfProtection, getRandomInt } = require('./utils');

const router = express.Router();

const signupValidators = [
  check('username')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the User Name")
  .isLength({max:20})
  .withMessage("User name must not be longer than 20 characters")
  .matches(/^\S*$/)
  .withMessage("User name must not contain any whitespace")
  .custom( async function(username) {
    const user = await User.findOne({
      where: {
        username
      }
    })
    if(user){
      throw new Error("Username already exists. Choose another one!")
    }
    return true
  }),
  check('email')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the Email")
  .isLength({max:30})
  .withMessage("Email must not be longer than 30 characters")
  .custom( async function(email) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user){
      throw new Error("Email already has an account.")
    }
    return true
  }),
  check('password')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the Password")
  .isLength({max:50})
  .withMessage("Password must not be longer than 50 characters")
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
  .withMessage("Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. '!@#$%^&*')"),
  check('confirmedPassword')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the Confirmed Password")
  .isLength({max:50})
  .withMessage("Confirmed password must not be longer than 50 characters")
  .custom((value, {req}) =>{
    if(value !== req.body.password){
      throw new Error("Confirmed password doesn't match the password provided")
    }
    return true
  }),
]

/* GET user form sign up. */
router.get('/signup', csrfProtection, asyncHandler(async(req, res, next) => {
  const path = req.path;
  const user = await User.build();
  res.render('user-signup', {path, user, title: "Sign up", csrfToken: req.csrfToken()});
}));

/*POST sigup form and redirect them back to the top-questions page */
router.post('/signup', signupValidators, csrfProtection, asyncHandler(async(req, res, next) =>{
  let path = req.path;
  let { username, email, avatarImage, password } = req.body;

  let avatarImageArray = [
    "https://mario.wiki.gallery/images/3/3e/MPSS_Mario.png"
  ]

  let user = await User.build({
    username,
    email,
    avatarImage
  });


  const validationErrors = validationResult(req);

  if(validationErrors.isEmpty()){
    if(avatarImage === ''){
      // let random = getRandomInt(0, avatarImageArray.length);
      user.avatarImage= avatarImageArray[0];
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    loginUser(req, res, user);
    return;

  }
  let errors = validationErrors.array().map(err => err.msg);

  res.render('user-signup',
  {
  path,
  user,
  errors,
  title:"Sign up",
  csrfToken: req.csrfToken()
});

}));

const loginValidators = [
  check('username')
  .exists({checkFalsy:true})
  .withMessage("Please provide a username"),
  check('password')
  .exists({checkFalsy:true})
  .withMessage("Please provide a password"),
];

/* GET user login form */
router.get('/login', csrfProtection, asyncHandler(async(req, res, next)=> {
  const path = req.path;

  let user = User.build();
  res.render('user-login',{path,title: "Login", user, csrfToken: req.csrfToken()})
}));

// POST user login form and redirect them to top questions if info is correct
router.post('/login',loginValidators, csrfProtection, asyncHandler(async(req, res, next)=>{
  const { username, password } = req.body;
  const path = req.path;

  let errors = [];
  const validationErrors = validationResult(req);

  if(validationErrors.isEmpty()){

    const user = await User.findOne({
      where:{
        username
      }
    })

    if(user){

      let isVerified;
      if(user.id > 15){
        isVerified = await bcrypt.compare(password, user.password.toString())
      } else {
        isVerified = password === user.password.toString();
      }

      if(isVerified ){
        loginUser(req, res, user);
        return;

      }
      errors.push("Username and/or password are incorrect. Try again. ");
    }
  }
  validationErrors.array().map(err => errors.push(err.msg));

  res.render('user-login',{path, errors, csrfToken: req.csrfToken()})
}));

// Logs out user from the website
router.get('/logout', async(req, res) =>{
  logoutUser(req, res);
});

router.get('/users', asyncHandler(async(req,res,next) =>{
  let users = await User.findAll({
    order: [
      ['username',  'ASC']
    ]
  })

  res.render('users-page', {users, title: "Users"});
}));


// Users Profile Page
router.get('/users/:id(\\d+)', asyncHandler(async(req,res,next) =>{
  let userId;
  if(res.locals.currUser){
    userId= res.locals.currUser.id;
  }
  let profileId = req.params.id;

  const user = await User.findByPk(profileId)
  const questions = await Question.findAll({
    include: [{
    model: Answer,
    attributes: []
    },
    {
      model: User,
      attributes: [
        'id',
        'avatarImage',
        'username'
      ]
    }],
    attributes:[
      'id',
      'content',
      'header',
      'updatedAt',
      [sequelize.fn("COUNT", sequelize.col("Answers.questionId")), "answerCnt"]],
      where: {
        userId: profileId
      },
      group: ["Question.id", "User.id" ],
      order: [[sequelize.fn("COUNT", sequelize.col("Answers.questionId")), 'DESC']],
      // limit: 10
  })

  res.render("profile-page",  { user, profileId, userId, questions, title: `Welcome to ${user.username}'s profile page!`})

}))


module.exports = router;
