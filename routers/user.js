const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require('../controller/UserController.js');
const config = require('../config.js');

router.post('/signup',userController.createUser)

router.post('/login',userController.verifyUser);

router.get('/logout',userController.deleteCookieAuthorization);

module.exports = router;