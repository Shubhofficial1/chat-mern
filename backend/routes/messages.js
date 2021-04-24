const express = require('express')

const router = express.Router()
const Message = require('../models/Message')

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch (err) {
    res.send(err.message)
  }
})

router.post('/', async (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    user: req.body.user,
  })
  try {
    const message = await newMessage.save()
    res.json(message)
  } catch (err) {
    res.send(err.message)
  }
})

router.delete('/deleteall', async (req, res) => {
  try {
    const deletedMessage = await Message.deleteMany()
    res.json(deletedMessage)
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = router
