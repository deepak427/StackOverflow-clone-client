import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const askQuestion =
  (questionData, navigate, token) => async (dispatch) => {
    try {
      const { data } = await api.postQuestion(questionData);
      dispatch({ type: "POST_QUESTION", payload: data.message });
      dispatch(fetchAllQuestions());

      if (data.updatedProfile !== null) {
        const updatedUser = {
          result: data.updatedProfile,
          token: token,
        };

        dispatch({ type: "UPDATE_CURRENT_USER", payload: data.updatedProfile });
        dispatch(setCurrentUser(updatedUser));
        localStorage.setItem('Profile', JSON.stringify({...updatedUser}))
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered,
      userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deleteQuestion(id);
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, noOfAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
