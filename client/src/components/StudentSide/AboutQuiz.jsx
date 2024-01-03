// components/AboutQuiz.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

import QuizPage from "./QuizPage";
import QuizComponent from "./QuizComponent";

const AboutQuiz = ({ quiz , userInfo}) => {
  const [quizPage, setQuizPage] = useState(false);
  const [aboutPage, setAboutPage] = useState(true);
  const [compPage, setCompPage] = useState(false);

  const handleQuizPage = () => {
    setAboutPage(false);
    setQuizPage(true);
  };

  const handleComponantPage = () => {
    setAboutPage(false);
    setQuizPage(false)
    setCompPage(true);
  };

  return (
    <div className="container my-4">
      {aboutPage && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{quiz.title}</h2>
            <p className="card-text">Class: {quiz.class}</p>
            <p className="card-text">Subject: {quiz.subject}</p>
            <p className="card-text">Start Date: {quiz.startDate}</p>
            <p className="card-text">Start Time: {quiz.startTime}</p>
            <p className="card-text">Due Date: {quiz.dueDate}</p>
            <p className="card-text">Due Time: {quiz.dueTime}</p>
            <p className="card-text">Published By: {quiz.publishedBy}</p>
            <p className="card-text">
              Is Published: {quiz.isPublished ? "Yes" : "No"}
            </p>
            <button
              className="btn btn-outline-success"
              onClick={handleQuizPage}
            >
              Ready
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={handleComponantPage}
            >
              Go back..
            </button>
          </div>
        </div>
      )}
      {quizPage && <QuizPage quizData={quiz} userInfo={userInfo} />}
      {compPage && <QuizComponent quizData={quiz} />}
    </div>
  );
};

export default AboutQuiz;
