const Posts = require("../models/post.model");

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({ include: ["usuario"] });
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener posts", error });
  }
};

const crearPosts = async (req, res) => {
  const { titulo, contenido, usuarioId } = req.body;

  try {
    const nuevo = await Posts.create({
      titulo,
      contenido,
      usuarioId,
    });

    res.status(201).json({
      mensaje: "Posts Creado",
      posts: nuevo,
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear posts", error: err });
  }
};

const actualizarPosts = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, usuarioId } = req.body;

  try {
    const posts = await Posts.findByPk(id);
    if (!posts) return res.status(400).json({ mensaje: "Posts no encontrado" });

    await posts.update({ titulo, contenido, usuarioId });

    res.status(200).json({
      mensaje: "Posts actualizado",
      posts,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear posts", error: err });
  }
};

const eliminarPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Posts.findByPk(id);
    if (!posts) return res.status(400).json({ mensaje: "Posts no encontrado" });

    await posts.destroy();
    res.status(200).json({ mensaje: "Posts eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear posts", error: err });
  }
};

module.exports = {
  obtenerPosts,
  crearPosts,
  actualizarPosts,
  eliminarPosts,
};
