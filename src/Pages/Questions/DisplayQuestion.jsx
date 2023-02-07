import React from "react";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import QuestionDetails from './QuestionDetails'

const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <QuestionDetails />
        <RightSidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
