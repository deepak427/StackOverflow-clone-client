import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import Quesrions from './Pages/Questions/Questions'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import DisplayQuestion from './Pages/Questions/DisplayQuestion'
import Tags from './Pages/Tags/Tags'
import Users from './Pages/Users/Users'
import UserProfile from './Pages/UserProfile/UserProfile'
import Subscription from './Pages/Subscription/Subscription'
import Payment from './Pages/Payment/Payment'
import Community from './Pages/Community/Community'
import Post from './Pages/Post/Post'
import FriendsHome from './Pages/Friends/Friends'
import FindFriends from './Pages/FindFriends/FindFriends'

const All_routes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Auth" element={<Auth/>}/>
        <Route path="/Questions" element={<Quesrions/>}/>
        <Route path="/AskQuestion" element={<AskQuestion/>} />
        <Route path="/Questions/:id" element={<DisplayQuestion/>} />
        <Route path="/Tags" element={<Tags/>} />
        <Route path="/Users" element={<Users/>} />
        <Route path="/Users/:id" element={<UserProfile/>} />
        <Route path="/Subscription" element={<Subscription/>} />
        <Route path="/Subscription/:id" element={<Payment/>} />
        <Route path="/Community" element={<Community/>} />
        <Route path="/Post" element={<Post/>} />
        <Route path="/Friends" element={<FriendsHome/>} />
        <Route path='/FindFriends' element={<FindFriends/>} />
    </Routes>
  )
}

export default All_routes
