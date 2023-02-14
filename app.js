const Sequelize = require('sequelize');
const indexDB = require('./models/index');
const startServer = require('./server/server');

// Database
const db = require('./config/database');

db.authenticate()
    .then(startServer)
        .catch(err => console.log(err));