var mongoose = require('mongoose')
var moment = require('moment')

var Schema = mongoose.Schema

var noteSchema = new Schema({
  // user: { type: Schema.ObjectId, ref: 'User', required: true },
  name: { type: String },
  content: { type: String },
  edited: { type: Date }
})

noteSchema.pre('save', function (next) {
  const note = this
  note.edited = moment()
  next()
})

module.exports = mongoose.model('Note', noteSchema)
