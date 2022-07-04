const { DataTypes } = require('sequelize')
const connection = require('../database/database')
const User = require('../users/User')

const Task =  connection.define('tasks', {
  description   : {
    type      : DataTypes.STRING,
    allowNull : false
  },
	priority      : {
    type        : DataTypes.INTEGER,
    defaultValue: 2
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

Task.sync({ alter: true})

module.exports = Task