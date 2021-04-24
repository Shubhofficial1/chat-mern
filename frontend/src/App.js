import './App.css'
import Message from './components/Message'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'
function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const pusher = new Pusher('8dd149011cd019abf735', {
      cluster: 'ap2',
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', function (data) {
      // alert(JSON.stringify(data))
      setMessages([...messages, data])

      // code to always push scrollbar to bottom
      var objDiv = document.getElementById('chat')
      objDiv.scrollTop = objDiv.scrollHeight
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  useEffect(() => {
    axios.get('http://localhost:5000/messages').then(({ data }) => {
      setMessages(data)
    })
  }, [])

  const submitForm = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/messages', {
        message: input,
      })
      .then((res) => {
        setInput('')
      })
  }

  return (
    <div className='app'>
      <main>
        <div className='chat' id='chat'>
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </div>
        <form className='form' onSubmit={submitForm}>
          <input
            autoFocus
            className='form__input'
            value={input}
            type='text'
            placeholder='Send a Message...'
            onChange={(event) => {
              setInput(event.target.value)
            }}
          ></input>
        </form>
      </main>
    </div>
  )
}

export default App
