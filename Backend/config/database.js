const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:3001/placeDB');


module.exports = sequelize;