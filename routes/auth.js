const express = require('express');
const { login, signup, googleSignin, recoverPassword } = require('../controllers/auth');

const router = express.Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/google-signin').post(googleSignin);
router.route('/recover-password').post(recoverPassword);

module.exports = router;
