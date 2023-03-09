const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const AccountsModel = require('../models/accounts.model');
const { verifyToken } = require('../helpers/token.jwt');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const validate = require('../validations/login.validation');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }, async (email, password, done) => {
    validate.login({ email, password });
    const userByEmail = await AccountsModel.findOne({ where: { email } });
    if (!userByEmail) throw CustomError('Email does not exist !', HTTPStatus.BAD_REQUEST);

    const verifyPassword = bcryptjs.compare(password, userByEmail.password);
    if (!verifyPassword) throw CustomError('Password is incorrect !', HTTPStatus.BAD_REQUEST);

    delete userByEmail.password;
    return done(null, userByEmail);
  }),
);

passport.use(
  new BearerStrategy(
    (token, done) => {
      const user = verifyToken(token);
      return done(null, user);
    },
  ),
);
