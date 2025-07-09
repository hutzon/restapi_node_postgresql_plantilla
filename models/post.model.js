const db = require("../database/config");

const { DataTypes } = require("sequelize");
const Usuario = require("./usuario.model");

const Post = db.define(
  "Post",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
  },
);

//Relaciones
Usuario.hasMany(Post, { foreignKey: "usuarioId", as: "posts" });
Post.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });

module.exports = Post;
