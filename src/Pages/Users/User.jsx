import React from 'react'
import { Link } from 'react-router-dom'

const User = ({user}) => {
  return (
    <Link to={`/Users/${user._id}`} className = 'user-Profile-Link'>
        <h3>{user.name.charAt().toUpperCase()}</h3>
        <h5>{user.name}</h5>
    </Link>
  )
}

export default User
