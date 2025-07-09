const { Router } = require("express");
const {
  obtenerPosts,
  crearPosts,
  actualizarPosts,
  eliminarPosts,
} = require("../controllers/posts.controller");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, obtenerPosts);
router.post("/", validarJWT, crearPosts);
router.put("/:id", validarJWT, actualizarPosts);
router.delete("/:id", validarJWT, eliminarPosts);

module.exports = router;
