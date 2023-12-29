const { query, queryBuilder } = require('./database');

const builder = queryBuilder();

const login = async (data) => {
  if ((!data.login && !data.senha)) return null;
  const consulta = builder
    .select(
      'usuario u',
      [
        'u.id_usuario',
        'u.telefone',
        'u.nome',
      ],
    );
  consulta.and(
    'u.senha',
    '=',
    `'${data.senha}'`,
  );
  const sql = consulta.execute();
  const resposta = await query(sql);
  if (resposta[0]) {
    return { usuario: resposta[0] };
  }
  return null;
};

module.exports = {
  login,
};
