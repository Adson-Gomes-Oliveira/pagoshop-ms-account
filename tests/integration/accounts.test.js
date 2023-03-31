/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const HTTPStatus = require('../../src/helpers/HTTP.status');
const AccountsModel = require('../../src/models/accounts.model');
const {
  ACCOUNT_MOCK_INSTANCE,
  ACCOUNT_MOCK_PAYLOAD,
  LOGIN_MOCK_PAYLOAD,
} = require('../mocks/accounts.mock');

describe('Testing accounts CRUD', () => {
  let token = '';
  let tokenForLogout = '';
  beforeAll(async () => {
    await mongoose.connect('mongodb://root:secret@127.0.0.1:27018/test_ecomm_accounts?authSource=admin');
    await AccountsModel.create(ACCOUNT_MOCK_PAYLOAD);

    const response = await axios.post('http://127.0.0.1:3002/api/accounts/login', {
      email: 'danilo@example.com',
      password: '@Danilo777Password',
    });

    token = response.headers.authorization;
  });

  afterAll(async () => {
    await AccountsModel.deleteMany();
    await mongoose.connection.close();
  });

  it('POST: The Login should be done with success', async () => {
    const response = await request(app)
      .post('/api/accounts/login')
      .send(LOGIN_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(typeof response.headers.authorization).toBe('string');
    expect(response.headers.authorization.includes('Bearer')).toBe(true);

    tokenForLogout = response.headers.authorization;

    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('name');
  });

  it('GET: The logout should be done with sucess', async () => {
    await request(app)
      .get('/api/accounts/logout')
      .set('Authorization', tokenForLogout)
      .expect(HTTPStatus.NO_CONTENT);

    await request(app)
      .get('/api/accounts')
      .set('Authorization', tokenForLogout)
      .expect(HTTPStatus.BAD_REQUEST);
  });

  it('GET: A list of accounts should be returned', async () => {
    const properties = Object.keys(ACCOUNT_MOCK_INSTANCE);
    const response = await request(app)
      .get('/api/accounts')
      .set('Authorization', token)
      .expect(HTTPStatus.OK);

    expect(response.body.length >= 0).toBe(true);
    properties.forEach((prop) => {
      expect(response.body[0]).toHaveProperty(prop);
    });
  });

  it('POST: A account should be created', async () => {
    const response = await request(app)
      .post('/api/accounts')
      .set('Authorization', token)
      .send(ACCOUNT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('address');
    expect(response.body.address).toHaveProperty('street');
    delete response.body._id;
    expect(response.body).toEqual({ ...ACCOUNT_MOCK_PAYLOAD, password: response.body.password });
  });

  it('PUT: A account should be edited', async () => {
    const NEW_ACCOUNT_MOCK_PAYLOAD = {
      ...ACCOUNT_MOCK_PAYLOAD,
      name: 'Marcelle Albuquerque',
      cpf: '44758291465',
    };

    const responsePost = await request(app)
      .post('/api/accounts')
      .set('Authorization', token)
      .send(ACCOUNT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    const responsePut = await request(app)
      .put(`/api/accounts/${responsePost.body._id}`)
      .set('Authorization', token)
      .send(NEW_ACCOUNT_MOCK_PAYLOAD)
      .expect(HTTPStatus.OK);

    expect(responsePut.body).toHaveProperty('_id');
    expect(responsePut.body).toHaveProperty('address');
    expect(responsePut.body.address).toHaveProperty('street');
    delete responsePut.body._id;
    expect(responsePut.body).toEqual(NEW_ACCOUNT_MOCK_PAYLOAD);
  });

  it('DELETE: A account should be deleted', async () => {
    const response = await request(app)
      .post('/api/accounts')
      .set('Authorization', token)
      .send(ACCOUNT_MOCK_PAYLOAD)
      .expect(HTTPStatus.CREATED);

    await request(app)
      .delete(`/api/accounts/${response.body._id}`)
      .set('Authorization', token)
      .expect(HTTPStatus.NO_CONTENT);
  });
});
