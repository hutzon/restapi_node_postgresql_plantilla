require("dotenv").config();
const app = require("./app");
const db = require("./database/config");

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((err) => console.err("Error al conectar DB", err));

db.sync();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
