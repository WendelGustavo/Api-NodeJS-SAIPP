require('dotenv').config();

const validarHeader = (header) => {
  if (
    header.token !== undefined
    && header.id_usuario !== undefined
    && header.key_public !== undefined) {
    return true;
  }
  return false;
};

const checkPublicKey = (header) => {
  if (header.key_public === process.env.PUBLIC_KEY) {
    return true;
  }
  return false;
};

module.exports = {
  validarHeader,
  checkPublicKey,
};
