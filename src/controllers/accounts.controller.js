const AccountsServices = require('../services/accounts.service');
const HTTPStatus = require('../helpers/HTTP.status');

const findAll = async (_req, res) => {
  const response = await AccountsServices.findAll();
  return res.status(HTTPStatus.OK).json(response);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const response = await AccountsServices.findOne(id);

  return res.status(HTTPStatus.OK).json(response);
};

const create = async (req, res) => {
  const payload = req.body;

  const response = await AccountsServices.create(payload);
  return res.status(HTTPStatus.CREATED).json(response);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const response = await AccountsServices.update(id, payload);
  return res.status(HTTPStatus.OK).json(response);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  await AccountsServices.deleteOne(id);
  return res.status(HTTPStatus.NO_CONTENT).end();
};

module.exports = {
  findAll,
  findOne,
  create,
  edit,
  deleteOne,
};
