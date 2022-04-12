const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models');
const { loginUser } = require('../auth');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

const signupValidators = [
  check('username')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the User Name")
  .isLength({max:20})
  .withMessage("User name must not be longer than 20 characters")
  .matches(/^\S*$/)
  .withMessage("User name must not contain any whitespace"),
  check('email')
  .exists({checkFalsy: true})
  .withMessage("Please provide a value for the Email")
  .isLength({max:30})
  .withMessage("Email must not be longer than 30 characters"),
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
  const user = await User.build();
  res.render('user-signup', {user, title: "Sign up", csrfToken: req.csrfToken()});
}));

router.post('/signup', signupValidators, csrfProtection, asyncHandler(async(req, res, next) =>{
  const { username, email, avatarImage, password } = req.body;

  const user = await User.build({
    username,
    email,
    avatarImage
  });

  console.log(user)
  const validationErrors = validationResult(req);
  console.log(validationErrors)

  if(validationErrors.isEmpty()){
    console.log('here')
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.redirect('/');
  }
  let errors = validationErrors.array().map(err => err.msg);

  res.render('user-signup',
  {user,
  errors,
  title:"Sign up",
  csrfToken: req.csrfToken()
});

}));

const loginValidators = [
  check('username')
  .exists({checkFalsy:true})
  .withMessage("Please provide a username for the username"),
  check('password')
  .exists({checkFalsy:true})
  .withMessage("Please provide a password for the password"),

]

router.get('/^(.*)#open-model/', csrfProtection, asyncHandler(async(req, res, next)=> {
  res.render('user-login', {title: "Login", csrfToken: req.csrfToken()})
}));

router.post('/^(.*)#open-model/',loginValidators, csrfProtection, asyncHandler(async(req, res, next)=>{
  const { username, password} = req.body;
  let errors = [];
  const validationErrors = validationResult(req);

  if(validationErrors.isEmpty()){
    const user = await User.findOne({
      where: username
    })

    if(user){
      const isVerified = await bcrypt.compare(password, user.password)

      if(isVerified){
        loginUser(req, res, user)
        res.redirect('/');
        return;
      }
      errors.push("Username and/or password are incorrect. Try again. ");
    }
  }
  validationErrors.array().map(err => errors.push(err.msg));

  res.render('/login',{errors, csrfToken: req.csrfToken()})
}));
module.exports = router;
