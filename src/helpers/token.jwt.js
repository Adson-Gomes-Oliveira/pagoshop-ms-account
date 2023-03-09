const JWT = require('jsonwebtoken');
const CustomError = require('./error.custom');
const HTTPStatus = require('./HTTP.status');
require('dotenv');

const generateToken = (jwtPayload) => {
  const token = JWT.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });

  return token;
};

const verifyToken = (token) => {
  const verify = JWT.verify(token, process.env.JWT_SECRET);
  if (!verify) throw new CustomError('Token is invalid !', HTTPStatus.UNAUTHORIZED);

  return verify;
};

module.exports = {
  generateToken,
  verifyToken,
};
