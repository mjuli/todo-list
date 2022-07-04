require('dotenv').config()

const Sequelize = require('sequelize')

const DATABASE = process.env.DATABASE
const USER_DB = process.env.USER_DB
const PASSWORD_DB = process.env.PASSWORD_DB
const HOST = process.env.HOST

const connection = new Sequelize(DATABASE, USER_DB, PASSWORD_DB, {
  host: HOST,
  dialect: 'mysql'
})

module.exports = connection