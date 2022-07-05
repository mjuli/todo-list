const express = require('express')
const router = express.Router()
const Task = require('./Task')

router.get('/tasks', async(req, res) => {
  try {
    const tasksDB = await Task.findAll({
      where: {
        active: true
      },
      order: [
        ['priority']
      ]
    })

    const tasks = tasksDB
      .map(task => task.toJSON())

    res.render('index.ejs', { tasks })

  } catch (error) {
    console.error('>>> Erro ao buscar tarefas:', error)
  }
})

router.post('/tasks/save', async(req, res) => {
  const description = req.body.task

  if(description){
    try {
      // TODO: Passar o id do usuário correto
      await Task
        .create({
          description,
          userId: 1
        })

      res.redirect('/tasks')
    } catch (error) {
      console.error('>>> Erro na criação de tarefa:', error)
    }
  }
})

router.post('/tasks/delete', async(req, res) => {
  const id = req.body.id

  if(!isNaN(id)){
    try {
      const taskDB = await Task
        .findOne({
          where: { id }
        })

      await taskDB
        .update({
          active: false
         })

      res.redirect('/tasks')

    } catch (error) {
        console.error('>>> Erro ao inativar tarefa:', error)
    }
  }
})

router.post('/tasks/edit', async(req, res) => {
  console.log('req.body: ', req.body)
  const id = req.body.id
  const description = req.body.task

  if(!isNaN(id) && description){
    try {
      const taskDB = await Task
        .findOne({
          where: { id }
        })

      await taskDB
        .update({ description })

      res.redirect('/tasks')

    } catch (error) {
        console.error('>>> Erro ao editar tarefa:', error)
    }
  }
})

module.exports = router;