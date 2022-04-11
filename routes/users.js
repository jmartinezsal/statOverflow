const express = require('express');

const { User } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils');



const router = express.Router();

/* GET users listing. */
router.get('/signup', csrfProtection, asyncHandler(async(req, res, next) => {
  const user = await User.build();
  res.render('user-signup', {user, title: "Sign up", csrfToken: req.csrfToken()});
}));

router.post('/signup',csrfProtection, asyncHandler(async(req, res, next) =>{
  
}))

module.exports = router;
