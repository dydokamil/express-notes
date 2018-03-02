var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.send('responded from notes')
})

router.post('/', (req, res, next) => {
  res.json({ result: 'success', data: req.body })
  //   json.send({ result: 'success' })
})

module.exports = router
