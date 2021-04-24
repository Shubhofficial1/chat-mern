const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const Pusher = require('pusher')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRETS,
  cluster: process.env.CLUSTER,
  useTLS: true,
})

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', () => {
  console.log('Mongodb connected successfully')
  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()

  changeStream.on('change', (change) => {
    // console.log('A Change occured', change)
    console.log('A change occured')
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument
      pusher.trigger('messages', 'inserted', {
        message: messageDetails.message,
        user: messageDetails.user,
      })
    } else {
      console.log('Error triggering Pusher')
    }
  })
})

app.get('/', (req, res) => {
  res.send('Home route')
})

const MessageRoute = require('./routes/messages')
app.use('/messages', MessageRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
