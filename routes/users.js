var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.json(err)
      return next(err)
    }
    if (!user) {
      let err = new Error('User not found')
      err.status = 401
      res.json(err)
      return next(err)
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        res.json(err)
        return next(err)
      }
      if (result) {
        res.json(user)
        req.session.userId = user._id
        next(user)
      } else {
        return next()
      }
    })
  })
})

router.post('/', (req, res, next) => {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save(err => {
    if (err) {
      res.status(400).json({ message: err.message })
      return next(err)
    }
    res.json(user)
  })
})

module.exports = router
