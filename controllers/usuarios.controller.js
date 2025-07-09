const usuarios = require("../data");
const Usuario = require("../models/usuario.model");

const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json({ usuarios });
};

const crearUsuario = async (req, res) => {
  const { nombre, correo, rol, password } = req.body;
  //   const nuevo = {
  //     id: usuarios.length + 1,
  //     nombre,
  //     correo,
  //     password,
  //     rol,
  //   };

  try {
    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya eta registrado" });
    }

    const nuevo = await Usuario.create({ nombre, correo, password, rol });

    //   usuarios.push(nuevo);
    res.status(201).json({
      mensaje: "Usuario Creado",
      usuario: nuevo,
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear usuario", error: err });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;
  //   const index = usuarios.findIndex((u) => u.id === parseInt(id));

  const usuario = await Usuario.findByPk(id);
  if (!usuario)
    return res.status(400).json({ mensaje: "Usuario no encontrado" });

  //   if (index === -1)
  //     return res.status(404).json({ mensaje: "Usuarion no encontrado" });

  //   usuarios[index] = { ...usuarios[index], nombre, correo, rol };

  await usuario.update({ nombre, correo, rol });

  res.status(200).json({
    mensaje: "Usuario actualizado",
    usuario,
  });
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  //   const index = usuarios.findIndex((u) => u.id === id);

  //   if (index === -1)
  //     return res.status(404).json({ mensaje: "Usuario no encontrado" });

  //   const eliminado = usuarios.splice(index, 1);

  const usuario = await Usuario.findByPk(id);
  if (!usuario)
    return res.status(400).json({ mensaje: "Usuario no encontrado" });

  await usuario.destroy();
  res.status(200).json({ mensaje: "Usuario eliminado" });
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
