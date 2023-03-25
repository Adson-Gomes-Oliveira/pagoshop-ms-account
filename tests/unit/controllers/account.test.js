const AccountsServices = require('../../../src/services/accounts.service');
const AccountsControllers = require('../../../src/controllers/accounts.controller');
const HTTPStatus = require('../../../src/helpers/HTTP.status');
const {
  ACCOUNT_MOCK_INSTANCE,
  ACCOUNT_MOCK_PAYLOAD,
} = require('../../mocks/accounts.mock');

describe('Testing Accounts Controllers', () => {
  const request = {};
  const response = {};

  beforeAll(() => {
    response.status = jest.fn().mockReturnValue(response);
    response.json = jest.fn().mockReturnValue();
    response.set = jest.fn().mockReturnValue(response);
    response.end = jest.fn().mockReturnValue();

    jest.spyOn(AccountsServices, 'findAll').mockResolvedValue([ACCOUNT_MOCK_INSTANCE]);
    jest.spyOn(AccountsServices, 'findOne').mockResolvedValue(ACCOUNT_MOCK_INSTANCE);
    jest.spyOn(AccountsServices, 'create').mockResolvedValue(ACCOUNT_MOCK_INSTANCE);
    jest.spyOn(AccountsServices, 'update').mockResolvedValue({ ...ACCOUNT_MOCK_INSTANCE, name: 'Admin' });
    jest.spyOn(AccountsServices, 'deleteOne').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: When a list of accounts is requested the status code 200 must be returned', async () => {
    await AccountsControllers.findAll(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('GET: When a account is requested the status code 200 must be returned', async () => {
    request.params = ACCOUNT_MOCK_INSTANCE._id;
    await AccountsControllers.findOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
  });

  it('POST: When a account is created the status code 201 must be returned with the correct data', async () => {
    request.body = ACCOUNT_MOCK_PAYLOAD;
    await AccountsControllers.create(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.CREATED);
    expect(response.json).toHaveBeenCalledWith(ACCOUNT_MOCK_INSTANCE);
  });

  it('PUT: When a account is updated the status code 200 must be returned with the correct data', async () => {
    request.params = ACCOUNT_MOCK_INSTANCE._id;
    request.body = { ...ACCOUNT_MOCK_INSTANCE, name: 'Admin' };
    await AccountsControllers.update(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.OK);
    expect(response.json).toHaveBeenCalledWith({ ...ACCOUNT_MOCK_INSTANCE, name: 'Admin' });
  });

  it('DELETE: When a account is deleted the status code 203 must be returned', async () => {
    request.params = ACCOUNT_MOCK_INSTANCE._id;
    await AccountsControllers.deleteOne(request, response);
    expect(response.status).toHaveBeenCalledWith(HTTPStatus.NO_CONTENT);
  });
});
