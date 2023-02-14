const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const { } = require('lodash');
const { where } = require('sequelize');

const User = sequelize.define('user', {

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    userName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        required: true
    },
    password: {
        type: Sequelize.DataTypes.TEXT,
        required: true,
        set(value) {
            const salt = bcrypt.genSaltSync();
            this.setDataValue('password',  bcrypt.hashSync(value, salt));
        },
    }
},
{
    timestamps: false
});

User.getUserById = async (email) => {
    return await User.findOne( { where: { email: email } });
}

User.login = async (email, password) => {
    const user = await User.findOne( { where: { email: email } });
    
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error(code,'incorrect Password');
    }
}
module.exports = User;