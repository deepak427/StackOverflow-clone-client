import React, { useState } from "react";
import "./ChatBot.css";
import Chat from "./Chat";
import chatBot from "../../assets/chatBot.svg";
import { useDispatch, useSelector } from "react-redux";
import Verify from "./Verify";
import decode from "jwt-decode";
import { useEffect } from "react";
import * as api from "../../api";

const ChatBot = () => {
  const Chats = [];

  const botToken = JSON.parse(localStorage.getItem("Verify"));

  var botres = useSelector((state) => state.askQuestionReducer);
  for (let i = 2; i < botres.length + 2; i++) {
    const chatObj = {
      id: i,
      message: botres[i - 2],
    };
    Chats.push(chatObj);
  }

  const [askBot, setAskBot] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  document.getElementsByClassName("bot-container")[0]?.scrollTo({
    top: document.getElementsByClassName("bot-container")[0].scrollHeight,
    behavior: "smooth",
  });

  const handleChat = async (e) => {
    e.preventDefault();
    if (loading) {
      alert("Please wait")
      return;
    }
    setQuestion("");
    if (botToken?.botToken) {
      setIsLoading(true);
      try {
        const { data } = await api.askQuestion({ question });
        dispatch({ type: "CHAT_UPDATE", payload: [question, data] });
      } catch (error) {
        console.log(error);
      }
      botres = null;
      setIsLoading(false);
    } else {
      alert("verify first");
    }
  };

  const handleBotOut = () => {
    dispatch({ type: "BOT_OUT", payload: null });
  };

  useEffect(() => {
    if (botToken?.botToken) {
      const decodedToken = decode(botToken.botToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleBotOut();
      }
    }
  },);

  return (
    <>
      {askBot ? (
        <>
          {" "}
          <div className="bot-container">
            <Chat
              chat={{ id: 1, message: "Hey there! How can i help you ?" }}
            />
            {!botToken?.botToken && <Verify />}

            {Chats.map((chat) => (
              <Chat chat={chat} key={chat.id} />
            ))}
            {loading && <Chat chat={{ id: 1, message: "Let me think ...." }} />}
          </div>
          <div className="ask-to-bot">
            <form onSubmit={handleChat}>
              <input
                type="text"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                placeholder="Ask..."
              />
              <button type="submit" className="ask-btn">
                Ask
              </button>
            </form>
          </div>{" "}
        </>
      ) : (
        <></>
      )}

      <div className="bot-icon">
        <img
          src={chatBot}
          alt="logo"
          width="40"
          onClick={() => setAskBot(!askBot)}
        />
      </div>
    </>
  );
};

export default ChatBot;
