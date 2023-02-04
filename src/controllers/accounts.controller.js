const AccountsModel = require('../models/accounts.model');
const HTTPStatus = require('../../helpers/HTTP.status');
const validations = require('../validations/accounts.validations');

const findAll = async (_req, res) => {
  const response = await AccountsModel.find();
  return res.status(HTTPStatus.OK).json(response);
}

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await AccountsModel.findById(id);

  return res.status(HTTPStatus.OK).json(response);
}

const create = async (req, res) => {
  const payload = req.body;
  const valid = validations.create(payload);
  if (valid) return res.status(valid.status).send(valid.message);

  const response = await AccountsModel.create(payload);
  return res.status(HTTPStatus.CREATED).json(response);
}

const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const valid = validations.create(payload);
  if (valid) return res.status(valid.status).send(valid.message);

  const response = await AccountsModel.findByIdAndUpdate(id, payload);
  return res.status(HTTPStatus.OK).json(response);
}

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await AccountsModel.findByIdAndDelete(id);
  return res.status(HTTPStatus.NO_CONTENT).end();
}

module.exports = {
  findAll,
  findOne,
  create,
  edit,
  deleteOne,
}
