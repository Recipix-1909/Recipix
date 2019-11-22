const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/recipix", {
  logging: false
});

// Sequelize.authenticate()
//   .then(function(err) {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(function(err) {
//     console.log("Unable to connect to the database:", err);
//   });

const User = db.define("user", {
  name: Sequelize.STRING
});

db.sync({ force: true });

module.exports = db;
