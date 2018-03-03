var moment = require('moment')

const Note = require('../models/note')

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  Note.find({}, 'name edited', (err, notes) => {
    if (err) {
      res.status(400).json({ message: err })
      return next(err)
    }
    if (notes == null) {
      res.json({ message: 'Empty' })
    }
    res.json(notes)
  })
})

router.post('/', (req, res, next) => {
  var note = new Note({ name: req.body.name, content: req.body.content })
  note.save(err => {
    if (err) {
      res.status(400).json({ message: err.message })
      return next(err)
    }
    res.json(note)
  })
})

router.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).exec((err, note) => {
    if (err) {
      res.status(400).json({ message: err })
      return next(err)
    }
    if (note == null) {
      res.json({ message: 'Empty' })
      return next(err)
    }
    res.json(note)
  })
})

router.put('/:id', (req, res, next) => {
  Note.findByIdAndUpdate(
    req.params.id,
    { ...req.body, edited: moment() },
    { new: true },
    (err, note) => {
      if (err) return res.status(400).json(err)
      return res.json(note)
    }
  )
})

router.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id, (err, note) => {
    if (err) return res.status(400).json(err)
    return res.status(204).json({ message: 'Delete OK' })
  })
})

module.exports = router
