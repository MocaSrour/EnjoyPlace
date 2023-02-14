const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Place = require('./Place');
const indexDB = require('./index');

// create Location Schema
const Location = sequelize.define('location', {

    loc: {
        type: Sequelize.DataTypes.DECIMAL
    }
},
{
    timestamps: false
});

module.exports = Location;