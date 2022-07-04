const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const TasksController = require('./tasks/TasksController')
const UsersController = require('./users/UsersController')

const User = require('./users/User')
const Task = require('./tasks/Task')

// Add view engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// Body-parser => formulários
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection
  .authenticate()
  .then(() => {
    console.log('Banco de dados conectado')
  })
  .catch(err => {
    console.error('Erro ao se conectar no banco de dados: ', err)
  })

app.use('/', TasksController)
app.use('./', UsersController)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen('8080', () => {
  console.log('Servidor iniciado')
})