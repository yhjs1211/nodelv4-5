const express = require('express');

const router = express.Router();
const UserController = require('../controller/user.js');
const userController = new UserController();

const validator = require('../middleware/validation.js');

router.post('/signup',validator.signUp,userController.signup);

router.post('/login',validator.login,userController.login);

router.get('/logout',userController.logout);

router.route('/users')
.put(validator.updateUser,userController.update);


module.exports = router;