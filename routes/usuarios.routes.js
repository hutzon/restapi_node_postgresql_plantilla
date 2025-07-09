const { Router } = require("express");
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios.controller");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, obtenerUsuarios);
router.post("/", validarJWT, crearUsuario);
router.put("/:id", validarJWT, actualizarUsuario);
router.delete("/:id", validarJWT, eliminarUsuario);

module.exports = router;
