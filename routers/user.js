const express = require('express');

const router = express.Router();
const userController = require('../controller/UserController.js');

const validator = require('../middleware/validation.js');

router.post('/signup',validator.validateSignUp,userController.createUser)

router.post('/login',validator.validateLogin,userController.verifyUser);

router.get('/logout',userController.deleteCookieAuthorization);

module.exports = router;