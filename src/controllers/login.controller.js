const HTTPStatus = require('../helpers/HTTP.status');
const loginServices = require('../services/login.service');

const login = async (req, res) => {
  const payload = req.body;
  const token = await loginServices.login(payload);

  return res.status(HTTPStatus.OK).json({ token });
};

module.exports = {
  login,
};
