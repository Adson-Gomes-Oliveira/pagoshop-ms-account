const AccountsModel = require('../models/accounts.model');
const HTTPStatus = require('../../helpers/HTTP.status');
const validations = require('../validations/accounts.validations');

const findAll = async (_req, res) => {
  const response = await AccountsModel.find();
  return res.status(HTTPStatus.OK).json(response);
}

module.exports = {
  findAll
}
