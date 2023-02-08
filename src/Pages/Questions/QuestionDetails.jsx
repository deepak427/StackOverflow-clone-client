import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import copy from "copy-to-clipboard";

import voteup from "../../assets/sortup.svg";
import votedown from "../../assets/sortdown.svg";
import "./Questions.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/question";

const QuestionDetails = () => {
  const { id } = useParams();

  const questionList = useSelector(state => state.questionReducer)

  const [answer, setAnswer] = useState('')
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Location = useLocation();
  const url = "https://stack-overflow-clone-project.netlify.app/"

  const handlePostAnswer = (e, answerLength) =>{
    e.preventDefault()
    if(User === null){
      alert("please login/signup")
      navigate('/Auth')
    }
    else{
      if (answer === '') {
        alert("Enter answer")
      }else{
        dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id}))
      }
    }

  }

  const handleShare = () => {
    copy(url + location.pathname)
    alert("Copied url")
  }

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate))
  }

  const handleUpVote = () => {
    dispatch(voteQuestion(id, 'upvote', User.result._id ))
  }

  const handleDownVote = () => {
    dispatch(voteQuestion(id, 'downvote', User.result._id ))
  }

  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img src={voteup} alt="upvote" width="18" onClick={handleUpVote} />
                      <p>{question.upVotes.length - question.downVotes.length}</p>
                      <img src={votedown} alt="downvote" width="18" onClick={handleDownVote}/>
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>Share</button>
                          {
                            User?.result?._id === question?.userId && (
                              <button type="button" onClick={handleDelete}>Delete</button>
                            )
                          }
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form onSubmit={(e) => {handlePostAnswer(e, question.answer.length)}} >
                    <textarea name="" id="" cols="30" rows="10" onChange={ e => setAnswer(e.target.value)}></textarea>
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post your answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {tag}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
