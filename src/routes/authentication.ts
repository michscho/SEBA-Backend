"use strict";
export {};
const express = require('express');
const router = express.Router();

const middleware = require('../middleware');
const AuthenticationController = require('../controllers/authenticationController');


router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.get('/me', middleware.checkAuthentication , AuthenticationController.me);
router.get('/logout', middleware.checkAuthentication, AuthenticationController.logout);


module.exports = router;