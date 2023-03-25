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

const LOGIN_MOCK_INSTANCE = {
  userId: '537eed02ed345b2e039652d2',
  name: 'Marcelle Freitas Santos',
};

const LOGIN_MOCK_PAYLOAD = {
  email: 'marcelle@example.com',
  password: 'Pa55word!',
};

const TOKEN_MOCK = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjp7InN0cmVldCI6ImNhbWluaG8gMTAiLCJudW1iZXIiOiIyIiwibW9yZV9pbmZvIjoiU2VndW5kYSBjYXNhIGRvIGxhZG8gZGlyZWl0byBkYSBydWEiLCJjZXAiOiI0NTA1NTE2OSIsImNpdHkiOiJWaXTDs3JpYSBkYSBDb25xdWlzdGEiLCJzdGF0ZSI6IkJBIn0sIl9pZCI6IjY0MGEyMzg3ODk5ZmRkMjgzZTM3ZDllOSIsIm5hbWUiOiJBZHNvbiBHb21lcyBPbGl2ZWlyYSIsImVtYWlsIjoiYWRzb25nb2xpdmVpcmEyMDIyQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkSkZ2YnkvLzRMTXFZTHprTkQ1UE5wT0FDWjdFWDZMdU5XNzZ4R2p6LlpjVWd1ajRRMXJudGkiLCJjcGYiOiI4MDg1NzQ1MDMxMCIsInBob25lIjoiNTU3Nzk4ODU0NzEyNCIsImlhdCI6MTY3OTU5MzgxNiwiZXhwIjoxNjc5NjgwMjE2fQ.7VeDVbESBTNBEg0ZDWkcqEev2dzdQlJgP9D8PlnXKb4';

module.exports = {
  ACCOUNT_MOCK_INSTANCE,
  ACCOUNT_MOCK_PAYLOAD,
  MOCK_ID,
  LOGIN_MOCK_INSTANCE,
  LOGIN_MOCK_PAYLOAD,
  TOKEN_MOCK,
};
