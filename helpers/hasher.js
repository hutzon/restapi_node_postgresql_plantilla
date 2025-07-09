const bcrypt = require("bcryptjs");

const encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const compararPassword = async (passwordIngresado, passwordHash) => {
  return await bcrypt.compare(passwordIngresado, passwordHash);
};

module.exports = {
  encriptarPassword,
  compararPassword,
};
