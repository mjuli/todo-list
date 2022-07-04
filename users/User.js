const { DataTypes } = require('sequelize')
const connection = require('../database/database')

const User = connection.define('users', {
  name    : {
    type      : DataTypes.STRING,
    allowNull : false
  },
	email   : {
    type      : DataTypes.STRING,
    allowNull : false,
    unique    : true,
    validate  : {
      isEmail: true
    }
  },
	password: {
    type      : DataTypes.STRING,
    allowNull : true,
    validate  : {
      min: 6,
      max: 20
    }
  }
})

User.sync()

module.exports = User