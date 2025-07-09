const usuarios = require("../data");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res) => {
  const { correo, password } = req.body;

  const usuario = usuarios.find(
    (u) => u.correo === correo && u.password === password,
  );

  if (!usuario) {
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
