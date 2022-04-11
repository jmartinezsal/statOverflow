const express = require('express');

const { User } = require('../db/models');
const { asyncHandler, csrfrotection } = require('./utils');



const router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
