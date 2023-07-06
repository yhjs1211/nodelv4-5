const express = require('express');
const router = express.Router();

// middleware
const auth = require('../middleware/auth.js');
const validator = require('../middleware/validation.js');

router.route('/')
.get()
.post(auth.verify,)
.put(auth.verify,)
.delete(auth.verify,);

module.exports=router;