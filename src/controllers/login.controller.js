const { generateToken } = require('../helpers/token.jwt');
const HTTPStatus = require('../helpers/HTTP.status');

const login = async (req, res) => {
  const token = generateToken(req.user.toJSON());

  res.set('Authorization', token);
  return res.status(HTTPStatus.OK).json({ token });
};

module.exports = {
  login,
};
