const sequelize = require("../config/database");
const User = require("./user");
const Product = require("./product");


const db = { sequelize, User,Product };

sequelize.sync({ force: false }) // Change to true to reset DB on restart
  .then(() => console.log("Database & tables synced"))
  .catch(err => console.log("Error syncing database:", err));

module.exports = db;





