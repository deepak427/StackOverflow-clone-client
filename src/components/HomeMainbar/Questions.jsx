import moment from 'moment/moment'
import React from 'react'
import { Link } from 'react-router-dom'

const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
      <div className='display-votes-ans no-votes'>
        <p>{question.upVotes.length - question.downVotes.length}</p>
        <p>Votes</p>
      </div>
      <div className='display-votes-ans no-ans'>
        <p>{question.noOfAnswers}</p>
        <p>Answers</p>
      </div>
      <div className='display-question-detail'>
        <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
        <div className="display-tags-time">
            <div className="display-tags">
                {
                    question.questionTags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                    ))
                }
            </div>
            <p className="display-time">
                asked {moment(question.askedOn).fromNow()} {question.userPosted}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
