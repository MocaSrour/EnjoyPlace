const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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