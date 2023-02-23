import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ChatBot from "./components/ChatBot/ChatBot";
import { BrowserRouter } from "react-router-dom";
import All_routes from './All_routes' 
import { useEffect } from "react";
import { fetchAllQuestions } from "./actions/question";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "./actions/users";
import { fetchAllPosts } from "./actions/post";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
    dispatch(fetchAllPosts())
  },[dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <All_routes />
        <ChatBot />
      </BrowserRouter>
    </div>
  );
}

export default App;
