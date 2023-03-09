const { Router } = require('express');
const passport = require('passport');
const loginController = require('../controllers/login.controller');

const router = Router();

router.post('/', passport.authenticate('local', { session: false }), loginController.login);

module.exports = router;
