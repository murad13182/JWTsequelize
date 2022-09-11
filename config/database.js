const { Sequelize } = require("sequelize");
require("dotenv").config();
console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
// const sequelize = new Sequelize("postgres://postgres:root@localhost:5432/postgres");

const sequelize = new Sequelize("postgres", "postgres","root", {
  logging: false,
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected with database: " + process.env.DB_NAME);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
checkConnection();

module.exports = sequelize;

