const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:3001/myTest');


module.exports = sequelize;