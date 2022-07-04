const express = require('express')
const router = express.Router()

router.get('/app', (req, res) => {
  res.render('index.ejs')
})

module.exports = router;