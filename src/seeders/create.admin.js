/* eslint-disable no-console */
const mongoose = require('mongoose');
const AccountsModel = require('../models/accounts.model');
require('dotenv').config();

const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || 'secret';
const HOST = process.env.DB_HOST || '127.0.0.1';
const DATABASE = process.env.DB_NAME || 'ecomm-account';
const DB_PORT = process.env.DB_PORT || '27018';

const createMain = async () => {
  await mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}?authSource=admin`)
    .then(() => {})
    .catch((error) => console.error(error));

  const newUser = await AccountsModel.create({
    name: 'Danilo Andrade',
    email: 'danilo@example.com',
    password: '@Danilo777Password',
    cpf: '27033292104',
    phone: '+5581981132530',
    address: {
      street: 'Alvorada',
      number: '1644',
      more_info: 'no_more_info',
      cep: '57099000',
      city: 'Maceió',
      state: 'AL',
    },
  });

  mongoose.connection.close();
  return newUser;
};

createMain().then((result) => console.log(result))
  .catch((error) => console.error(error));
