const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport')
const User = require('../models/user');
const users = require('../controllers/users');


router.route('/register')
   .get(users.renderRegister)
   .post(users.registerUser);

router.route('/login')
  .get(users.userLogin)
  .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.postLogin);

router.get('/logout', users.userLogout);
  

module.exports = router;