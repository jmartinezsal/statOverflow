const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();


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
})


module.exports = router;
