const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize;

sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  logging: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // console.log(model.name)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// console.log(db)
module.exports = db;
