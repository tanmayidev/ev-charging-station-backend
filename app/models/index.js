const Sequelize = require("sequelize");
const sequelize = new Sequelize("stations", "user", "password", {
  host: "./database.db",
  dialect: "sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.stations = require("./station.model.js")(sequelize, Sequelize);

module.exports = db;
