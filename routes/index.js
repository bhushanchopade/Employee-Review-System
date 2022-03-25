const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const userController = require("../controllers/userController");



// homepage router
router.get("/", userController.home);

// Admin router
router.use('/admin' , require('./admin'));

// user router
router.use('/user' , require('./user'));

// router for review
router.use('/reviews' , require('./review'));



module.exports = router;