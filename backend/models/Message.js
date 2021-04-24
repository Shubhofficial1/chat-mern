const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: 'Anonymous',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Messages', messageSchema)
