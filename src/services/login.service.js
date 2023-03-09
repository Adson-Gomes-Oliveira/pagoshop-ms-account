const bcryptjs = require('bcryptjs');
const { generateToken } = require('../helpers/token.jwt');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const AccountsModel = require('../models/accounts.model');
const validate = require('../validations/login.validation');

const login = async (payload) => {
  validate.login(payload);
  const { email, password } = payload;

  const getUserByEmail = await AccountsModel.findOne({ where: { email } });
  if (!getUserByEmail) throw CustomError('Email does not exist !', HTTPStatus.NOT_FOUND);

  const verifyPassword = bcryptjs.compare(password, getUserByEmail.password);
  if (!verifyPassword) throw CustomError('Password is incorrect !', HTTPStatus.UNAUTHORIZED);

  delete getUserByEmail.password;

  const token = generateToken(getUserByEmail);
  return token;
};

module.exports = {
  login,
};
