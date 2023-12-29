const util = require('../util/util');

const allowedUrls = [
  '/login',
  '/sobre',
  '/',
];

// eslint-disable-next-line func-names
module.exports = async function (req, res, next) {
  req.util = util;
  if (allowedUrls.includes(req.originalUrl)) {
    next();
  } else {
    if (!util.auth.validarHeader(req.headers)) {
      res.status(400).send({
        status: 400,
        msg: {
          resultado: false,
          msg: 'Cabeçalho inválido!',
        },
      });
      return false;
    }

    if (!util.auth.checkPublicKey(req.headers)) {
      res.status(401).send({
        status: 401,
        msg: {
          resultado: false,
          msg: 'Chave de acesso inválida!',
        },
      });
      return false;
    }

    if (!await util.token.checktoken(req.headers.token, req.headers.id_usuario)) {
      res.status(401).send({
        status: 401,
        msg: {
          resultado: false,
          msg: 'Token de usuário inválido!',
        },
      });
      return false;
    }

    next();
  }
  return false;
};
