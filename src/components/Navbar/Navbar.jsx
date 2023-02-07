import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/logo.png'
import search from '../../assets/search.svg'
import Avatar from '../Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'

const Navbar = () => {

  var user = useSelector((state) => (state.currentUserReducer));
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut =  () => {
    dispatch({type:"LOGOUT"});
    navigate("/")
    dispatch(setCurrentUser(null))
  }
  
  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogOut()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])

  return (
    <nav className='main-nav'>
        <div className="navbar">
            <Link to="/" className='nav-item nav-logo'>
                <img src={logo} alt="Stackoverflow" width="200" />
            </Link>
            <Link to="/" className='nav-item nav-btn about'>About</Link>
            <Link to="/" className='nav-item nav-btn products'>Products</Link>
            <Link to="/" className='nav-item nav-btn forTeams'>ForTeams</Link>
            <form>
                <input type="text" placeholder='search...' />
                <img src={search} alt="logo" width="20" className='search-icon'/>
            </form>

            {user === null ? <Link to="/Auth" className='nav-item nav-links'>Log in</Link>:
              <><Link to={`Users/${user?.result?._id}`} style={{textDecoration: "none"}}><Avatar backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%" color="white">{user.result.name.charAt(0).toUpperCase()}</Avatar></Link>
              <button className='nav-item nav-links' onClick={handleLogOut}>Log out</button></>
            }
        </div>
    </nav>
  )
}

export default Navbar
