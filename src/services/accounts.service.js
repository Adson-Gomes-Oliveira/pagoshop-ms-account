const AccountsModel = require('../models/accounts.model');
const validate = require('../validations/accounts.validations');
const encrypt = require('../helpers/encrypt');

const findAll = async () => {
  const accountList = await AccountsModel.find();
  return accountList;
};

const findOne = async (id) => {
  const account = await AccountsModel.findById(id);
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
  create,
  update,
  deleteOne,
};
