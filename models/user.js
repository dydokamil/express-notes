var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Schema = mongoose.Schema

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date }
})

userSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return { message: err.message }
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
