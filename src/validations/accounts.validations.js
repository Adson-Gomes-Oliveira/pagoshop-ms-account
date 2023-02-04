const JOI = require('joi');
const HTTPStatus = require('../../helpers/HTTP.status');

const create = (payload) => {
  const { error } = JOI.object({
    name: JOI.string().required(),
    email: JOI.email().required(),
    password: JOI.string().min(8).pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).*$')).required(),
    cpf: JOI.number().min(11).max(11).required(),
    phone: JOI.number().min(10).max(13).required(),
    address: {
      street: JOI.string().required(),
      number: JOI.string().required(),
      cep: JOI.number().min(8).max(8).required(),
      city: JOI.string().required(),
      state: JOI.string().min(2).max(2).pattern(new RegExp('^(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RR|RS|SC|SE|SP|TO)$')).required(),
    }
  }).validate(payload);

  if (error) return { status: HTTPStatus.UN_ENTITY, message: error.message };
  return null;
}

module.exports = {
  create,
}