import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import QuestionsList from './QuestionsList'
import './HomeMainbar.css'
import { useSelector } from 'react-redux'

const HomeMainbar = () => {

  const user = 1;
  const Location = useLocation()

  const questionList = useSelector(state => state.questionReducer)

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
            <QuestionsList questionList={questionList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
