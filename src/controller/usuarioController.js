const util = require('../util/token');

const userModel = require('../model/usuarioModel');

exports.login = async (data) => {
  if (data.senha && data.login) {
    const resp = await userModel.login(data);
    if (resp != null) {
      resp.token = await util.setToken(resp.usuario.id_usuario);

      return {
        status: 200,
        msg: {
          resultado: true, msg: 'Usuário Logado com Sucesso!',
        },
        data: resp,
      };
    }
    return {
      status: 400,
      msg: {
        resultado: false, msg: 'Usuário não localizado',
      },
      data: null,
    };
  }
  return {
    status: 400,
    msg: {
      resultado: false, msg: 'Informações incompletas',
    },
    data: null,
  };
};
