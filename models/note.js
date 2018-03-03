var mongoose = require('mongoose')

var Schema = mongoose.Schema

var noteSchema = new Schema({
  // user: { type: Schema.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  content: { type: String }
})

module.exports = mongoose.model('Note', noteSchema)
