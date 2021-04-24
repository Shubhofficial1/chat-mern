import React from 'react'
import '../components/message.css'

const Message = ({ message }) => {
  return (
    <div className='message'>
      <span>
        <span className='user'>{message.user}</span>:
        <span className='text'>{message.message}</span>
      </span>
    </div>
  )
}

export default Message
