import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import QuestionsList from './QuestionsList'
import './HomeMainbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllUsers } from "../../actions/users";

const HomeMainbar = () => {

  const user = useSelector((state) => (state.currentUserReducer));
  const Location = useLocation()
  const dispatch = useDispatch();

  const questionList = useSelector(state => state.questionReducer)

  useEffect(() => {
    dispatch(fetchAllUsers())
  },[])

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          Location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <Link to={user===null?"/Auth":"/AskQuestion"} className='ask-btn'>Ask Question</Link>
      </div>
      <div>
        {
          questionList.data === null ?
          <h1>Loading...</h1> :
          <>
            <p>{questionList.data.length} Questions</p>
            <QuestionsList questionList={questionList.data.reduce((acc, item)=> [item].concat(acc), [])} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
