const mongoose = require('mongoose');

const accountsMongooseSchema = new mongoose.Schema({
  id: String,
  name: {type: String, require: true},
  email: {type: String, require: true},
  password: {type: String, require: true},
  created_at: {type: Date, require: true},
  cpf: {type: String, require: true},
  phone: {type: String, require: true},
  address: {
    street: {type: String, require: true},
    number: {type: String, require: true},
    more_info: {type: String, require: true},
    cep: {type: String, require: true},
    city: {type: String, require: true},
    state: {type: String, require: true},
  },
});

const AccountsModel = mongoose.model('accounts', accountsMongooseSchema);
module.exports = AccountsModel;
