const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Place = require('./Place');
const indexDB = require('./index');

// create Location Schema
const Location = sequelize.define('location', {

    lat: {
        type: Sequelize.DataTypes.DECIMAL
    },
    lng: {
        type: Sequelize.DataTypes.DECIMAL
    }
},
{
    timestamps: false
});

module.exports = Location;