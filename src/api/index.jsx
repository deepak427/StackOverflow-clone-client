import axios from "axios";
const API = axios.create({ baseURL: "https://stack-overflow-clone-server.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswer, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswer,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const addFriend = (id, postId) => API.patch(`/user/addfriend/${id}`,postId)
export const acceptFriend = (id, friendId) => API.patch(`/user/addfriend/accept/${id}`,friendId)
export const deleteFriend = (id, friendId) => API.patch(`/user/addfriend/delete/${id}`,friendId)

export const askQuestion = (askData) => API.post("/bot/ask", askData);
export const verify = (email) => API.post("/bot/verify", email);

export const payment = (id, paymentData) =>
  API.post(`/subscription/payment/${id}`, paymentData);
export const paymentFree = (paymentData) =>
  API.post(`/subscription/Free`, paymentData);

export const postImage = (postData) => API.post("/post/uploadImage", postData);
export const postVideo = (postData) => API.post("/post/uploadVideo", postData);

export const postSomething = (postData) => API.post("/post/upload", postData);
export const getAllPosts = () => API.get("/post/get");
export const likePost = (id, userId) =>
  API.patch(`/post/like/${id}`, { userId });
export const deletePost = (id) => API.delete(`/post/delete/${id}`);

export const postComment = (
  id,
  commentBody,
  userCommented,
  commentedto,
  userId
) =>
  API.patch(`/comment/post/${id}`, {
    id,
    commentBody,
    userCommented,
    commentedto,
    userId,
  });
export const deleteComment = (id, commentId) =>
  API.patch(`/comment/delete/${id}`, commentId);
