const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    loggin: false,
  },
);

module.exports = db;
