const JOI = require('joi');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');

const login = (payloadToValidate) => {
  const { error } = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().min(8).required(),
  }).validate(payloadToValidate);

  if (error) throw new CustomError(error.message, HTTPStatus.UN_ENTITY);
};

module.exports = {
  login,
};
