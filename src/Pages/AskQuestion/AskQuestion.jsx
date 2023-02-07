import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";

const AskQuestion = () => {

    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionTags, setQuestionTags] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result._id }, navigate))
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }

  return (
    <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nesciunt.</p>
                        <input type="text" id="ask-ques-title" onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder="This is a title placeholder" />
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nesciunt.</p>
                        <textarea id="ask-ques-body" onChange={(e) => {setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tag">
                        <h4>Tag</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nesciunt.</p>
                        <input type="text" id="ask-ques-tag" onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} placeholder="This is a Tag placeholder" />
                    </label>
                </div>
                <input type="submit" value="review your question" className="review-btn" />
            </form>
        </div>
    </div>
  ); 
};

export default AskQuestion;
