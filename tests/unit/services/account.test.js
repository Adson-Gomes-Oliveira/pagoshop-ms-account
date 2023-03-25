const AccountsModel = require('../../../src/models/accounts.model');
const AccountServices = require('../../../src/services/accounts.service');
const {
  ACCOUNT_MOCK_INSTANCE, ACCOUNT_MOCK_PAYLOAD,
} = require('../../mocks/accounts.mock');

describe('Testing Accounts Services', () => {
  beforeAll(() => {
    jest.spyOn(AccountsModel, 'find').mockResolvedValue([ACCOUNT_MOCK_INSTANCE]);
    jest.spyOn(AccountsModel, 'findById').mockResolvedValue(ACCOUNT_MOCK_INSTANCE);
    jest.spyOn(AccountsModel, 'create').mockResolvedValue(ACCOUNT_MOCK_INSTANCE);
    jest.spyOn(AccountsModel, 'findByIdAndUpdate').mockResolvedValue({ ...ACCOUNT_MOCK_INSTANCE, name: 'Admin' });
    jest.spyOn(AccountsModel, 'findByIdAndDelete').mockResolvedValue();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('GET: A list of accounts should be returned', async () => {
    const resultProperties = Object.keys(ACCOUNT_MOCK_INSTANCE);
    const accountListTest = await AccountServices.findAll();
    expect(accountListTest).toBeInstanceOf(Array);
    resultProperties.forEach((prop) => {
      expect(accountListTest[0]).toHaveProperty(prop);
    });
  });

  it('GET: A specific account should be returned', async () => {
    const accountListTest = await AccountServices.findOne(ACCOUNT_MOCK_INSTANCE._id);
    expect(accountListTest).toBe(ACCOUNT_MOCK_INSTANCE);
  });

  it('POST: A account should be added with success', async () => {
    const accountTest = await AccountServices.create(ACCOUNT_MOCK_PAYLOAD);
    expect(accountTest).toHaveProperty('_id');
    expect(accountTest).toBe(ACCOUNT_MOCK_INSTANCE);
  });

  it('PUT: A account should be updated with success', async () => {
    const accountTest = await AccountServices.update({ ...ACCOUNT_MOCK_PAYLOAD, name: 'Admin' });
    expect(accountTest).toStrictEqual({ ...ACCOUNT_MOCK_INSTANCE, name: 'Admin' });
  });

  it('DELETE: A account should be deleted with success', async () => {
    const accountTest = await AccountServices.deleteOne(ACCOUNT_MOCK_INSTANCE._id);
    expect(accountTest).toBe(undefined);
  });
});
