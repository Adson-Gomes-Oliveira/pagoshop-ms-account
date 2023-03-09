const CustomError = require('../helpers/error.custom');
const HTTPStatus = require('../helpers/HTTP.status');
const { verifyToken } = require('../helpers/token.jwt');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) throw new CustomError('Token is missing !', HTTPStatus.BAD_REQUEST);
  const user = verifyToken(authorization);

  res.locals.user = user;
  next();
};

module.exports = authMiddleware;
