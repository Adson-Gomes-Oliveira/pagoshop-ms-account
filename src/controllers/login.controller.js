const { addToken } = require('../redis/blocklist.service');
const { generateToken } = require('../helpers/token.jwt');
const HTTPStatus = require('../helpers/HTTP.status');

const login = async (req, res) => {
  const token = generateToken(req.user.toJSON());

  res.set('Authorization', token);
  return res.status(HTTPStatus.OK).json({ token });
};

const loggout = async (req, res) => {
  const { token } = req;
  await addToken(token);

  res.status(204).end();
};

module.exports = {
  login,
  loggout,
};
