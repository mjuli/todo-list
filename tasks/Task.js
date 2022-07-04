const { DataTypes } = require('sequelize')
const connection = require('../database/database')
const User = require('../users/User')

const Task =  connection.define('tasks', {
  description   : {
    type      : DataTypes.STRING,
    allowNull : false
  },
	priority      : {
    type        : DataTypes.ENUM,
    values      : ['high', 'medium', 'low'],
    defaultValue: 'low'
  },
	active        : {
    type        : DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull   : false
  },
  expirationDate: {
    type : DataTypes.DATEONLY
  }
})

User.hasMany(Task, {
  foreignKey: {
    allowNull: false
  }
})
Task.belongsTo(User)

Task.sync()

module.exports = Task