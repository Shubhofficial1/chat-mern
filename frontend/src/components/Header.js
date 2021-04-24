import React from 'react'
import '../components/header.css'
import SearchIcon from '@material-ui/icons/Search'
import { Avatar, IconButton } from '@material-ui/core'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'

const Header = () => {
  return (
    <div className='header__container'>
      <div className='header__leftone'>
        <IconButton style={{ color: 'white' }}>
          <AllInclusiveIcon />
        </IconButton>

        <div className='input'>
          <div className='input__left'>
            <IconButton style={{ color: '#5d7290' }}>
              <SearchIcon />
            </IconButton>
          </div>
          <input className='input__right' />
        </div>
      </div>
      <div>
        <IconButton>
          <Avatar
            className='header__profile'
            alt=''
            src='https://instagram.fpat4-1.fna.fbcdn.net/v/t51.2885-19/s150x150/26870632_392044917889986_3858399546992230400_n.jpg?tp=1&_nc_ht=instagram.fpat4-1.fna.fbcdn.net&_nc_ohc=d-PYuYozzgQAX9uxAN-&edm=ABfd0MgAAAAA&ccb=7-4&oh=36e19e041ee5b4be49c32e3827f56184&oe=60A56609&_nc_sid=7bff83'
          />
        </IconButton>
      </div>
    </div>
  )
}

export default Header
