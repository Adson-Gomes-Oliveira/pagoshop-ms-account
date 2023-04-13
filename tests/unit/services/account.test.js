const HTTPStatus = require('../../../src/helpers/HTTP.status');
const AccountsModel = require('../../../src/models/accounts.model');
const AccountServices = require('../../../src/services/accounts.service');
const {
  ACCOUNT_MOCK_INSTANCE, ACCOUNT_MOCK_PAYLOAD,
} = require('../../mocks/accounts.mock');

describe('Testing Accounts Services', () => {
  describe('GET: A list of accounts', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'find').mockResolvedValueOnce([ACCOUNT_MOCK_INSTANCE])
        .mockResolvedValue([]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned', async () => {
      const accountList = await AccountServices.findAll();
      expect(accountList).toStrictEqual([ACCOUNT_MOCK_INSTANCE]);
    });

    it('should fail when content not found and throw 404 error', async () => {
      try {
        await AccountServices.findAll();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NOT_FOUND);
        expect(error.message).toBe('Content not found');
      }
    });
  });

  describe('GET: A specific account', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'findById').mockResolvedValueOnce(ACCOUNT_MOCK_INSTANCE)
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned', async () => {
      const account = await AccountServices.findOne(ACCOUNT_MOCK_INSTANCE._id);
      expect(account).toBe(ACCOUNT_MOCK_INSTANCE);
    });

    it('should fail when content not found and throw 404 error', async () => {
      try {
        await AccountServices.findOne(ACCOUNT_MOCK_INSTANCE._id);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NOT_FOUND);
        expect(error.message).toBe('Content not found');
      }
    });

    it('should fail when id not found and throw 400 error', async () => {
      try {
        await AccountServices.findOne();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('Id not found');
      }
    });
  });

  describe('GET: A specific account by Email', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'findOne').mockResolvedValueOnce(ACCOUNT_MOCK_INSTANCE)
        .mockResolvedValue();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be returned', async () => {
      const account = await AccountServices.findOneByEmail(ACCOUNT_MOCK_PAYLOAD.email);
      expect(account).toBe(ACCOUNT_MOCK_INSTANCE);
    });

    it('should fail when content not found and throw 404 error', async () => {
      try {
        await AccountServices.findOneByEmail(ACCOUNT_MOCK_PAYLOAD.email);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.NOT_FOUND);
        expect(error.message).toBe('Content not found');
      }
    });

    it('should fail when email not found and throw 400 error', async () => {
      try {
        await AccountServices.findOneByEmail();
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('Email not found');
      }
    });
  });

  describe('POST: A account', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'create').mockResolvedValue(ACCOUNT_MOCK_INSTANCE);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be updated', async () => {
      const account = await AccountServices.create(ACCOUNT_MOCK_PAYLOAD);
      expect(account).toBe(ACCOUNT_MOCK_INSTANCE);
    });

    it('should fail when validation fails and throw 422 error', async () => {
      const { name: _, ...accountWithoutName } = ACCOUNT_MOCK_PAYLOAD;
      try {
        await AccountServices.create(accountWithoutName);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.UN_ENTITY);
        expect(error.message).toBe('name is required');
      }
    });
  });

  describe('PUT: A account', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'findByIdAndUpdate').mockResolvedValue({ ...ACCOUNT_MOCK_PAYLOAD, cpf: '98865532211' });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be created', async () => {
      const account = await AccountServices.update(ACCOUNT_MOCK_INSTANCE._id, { ...ACCOUNT_MOCK_PAYLOAD, cpf: '98865532211' });
      expect(account).toStrictEqual({ ...ACCOUNT_MOCK_PAYLOAD, cpf: '98865532211' });
    });

    it('should fail when validation fails and throw 422 error', async () => {
      const { name: _, ...accountWithoutName } = ACCOUNT_MOCK_PAYLOAD;
      try {
        await AccountServices.update(ACCOUNT_MOCK_INSTANCE._id, accountWithoutName);
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.UN_ENTITY);
        expect(error.message).toBe('name is required');
      }
    });

    it('should fail when id not found and throw 400 error', async () => {
      try {
        await AccountServices.update({ ...ACCOUNT_MOCK_PAYLOAD, cpf: '98865532211' });
      } catch (error) {
        expect(error.status).toBe(HTTPStatus.BAD_REQUEST);
        expect(error.message).toBe('Id not found');
      }
    });
  });

  describe('DELETE: A account', () => {
    beforeAll(() => {
      jest.spyOn(AccountsModel, 'findByIdAndDelete').mockResolvedValue(undefined);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should be deleted', async () => {
      const accountDelete = await AccountServices.deleteOne(ACCOUNT_MOCK_INSTANCE._id);
      expect(accountDelete).toBe(undefined);
    });
  });
});
