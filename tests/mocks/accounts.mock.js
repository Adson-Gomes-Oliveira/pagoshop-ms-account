const MOCK_ID = '537eed02ed345b2e039652d2';

const ACCOUNT_MOCK_INSTANCE = {
  _id: '537eed02ed345b2e039652d2',
  name: 'Marcelle Freitas Santos',
  email: 'marcelle@example.com',
  password: 'senhasecreta',
  cpf: '35785241112',
  phone: '5511981996587',
  address: {
    street: 'Rua B',
    number: '155',
    more_info: 'no_info',
    cep: '75882196',
    city: 'Uberaba',
    state: 'MG',
  },
};

const ACCOUNT_MOCK_PAYLOAD = {
  name: 'Marcelle Freitas Santos',
  email: 'marcelle@example.com',
  password: 'Pa55word!',
  cpf: '35785241112',
  phone: '5511981996587',
  address: {
    street: 'Rua B',
    number: '155',
    more_info: 'no_info',
    cep: '75882196',
    city: 'Uberaba',
    state: 'MG',
  },
};

module.exports = {
  ACCOUNT_MOCK_INSTANCE,
  ACCOUNT_MOCK_PAYLOAD,
  MOCK_ID,
};
