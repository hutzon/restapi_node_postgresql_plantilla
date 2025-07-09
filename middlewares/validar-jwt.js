const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ mensaje: "No hay token en la peticion" });
  }

  try {
    const { id, nombre } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    req.nombre = nombre;

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token no valido" });
  }
};

module.exports = {
  validarJWT,
};
