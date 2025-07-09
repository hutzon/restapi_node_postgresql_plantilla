const usuarios = require("../data");
const { generarJWT } = require("../helpers/generar-jwt");
const { compararPassword } = require("../helpers/hasher");
const Usuario = require("../models/usuario.model");

const login = async (req, res) => {
  const { correo, password } = req.body;

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(400).json({
      mensaje: "Correo o contrase;a incorrectos",
    });
  }

  const validPassword = await compararPassword(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      mensaje: "Correo o contrase;a incorrectos",
    });
  }

  const token = await generarJWT(usuario.id, usuario.nombre);

  res.json({
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
    },
    token,
  });
};

module.exports = {
  login,
};
