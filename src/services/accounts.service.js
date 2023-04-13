const AccountsModel = require('../models/accounts.model');
const validate = require('../validations/accounts.validations');
const encrypt = require('../helpers/encrypt');
const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');

const findAll = async () => {
  const accountList = await AccountsModel.find();

  if (accountList.length === 0) throw CustomError('Content not found', HTTPStatus.NOT_FOUND);

  return accountList;
};

const findOne = async (id) => {
  if (typeof id === 'undefined') throw CustomError('Id not found', HTTPStatus.BAD_REQUEST);

  const account = await AccountsModel.findById(id);

  if (!account) throw CustomError('Content not found', HTTPStatus.NOT_FOUND);

  return account;
};

const findOneByEmail = async (email) => {
  if (typeof email === 'undefined') throw CustomError('Email not found', HTTPStatus.BAD_REQUEST);

  const account = await AccountsModel.findOne({ email });

  if (!account) throw CustomError('Content not found', HTTPStatus.NOT_FOUND);

  return account;
};

const create = async (payload) => {
  validate.payload(payload);

  const hashedPassword = await encrypt(payload.password);
  const payloadPasswordHashed = { ...payload, password: hashedPassword };

  const account = await AccountsModel.create(payloadPasswordHashed);
  return account;
};

const update = async (id, payload) => {
  validate.payload(payload);

  const account = await AccountsModel.findByIdAndUpdate(id, payload, { new: true });
  return account;
};

const deleteOne = async (id) => {
  await AccountsModel.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  findOne,
  findOneByEmail,
  create,
  update,
  deleteOne,
};
