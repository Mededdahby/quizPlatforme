// components/QuizComponent.jsx

import React, { useState, useEffect } from "react";

import AboutQuiz from "./AboutQuiz";

const QuizComponent = ({ userInfo }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [about, setAboutPage] = useState(false);
  const [compenentPage, setComponantPage] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [qcmIds, setQcmIds] = useState([]);

  const handleAboutPage = (quiz) => {
    setAboutPage(true);
    setComponantPage(false);
    setSelectedQuiz(quiz);
  };

  async function getQuizInfo() {
    const res = await fetch(
      `http://localhost:5000/responseById/${userInfo.userId}`
    );
    const qcmIds = await res.json();
    setQcmIds(qcmIds);
  }

  async function getMyData() {
    try {
      let response = await fetch("http://localhost:5000/data", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setQuizzes(data);
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function isQuizDone(quizId) {
    const qcmid = qcmIds.find((e) => e._id == quizId);
    if (qcmid) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    getQuizInfo();
    getMyData();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f0f0f0", padding: "20px" }}
    >
      <div className="row justify-content-center align-items-center">
        {compenentPage &&
          quizzes.map((quiz,i) => (
            <div key={i} className="col-md-4 mb-4">
              <div
                className="card"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{quiz.title}</h5>
                  <p className="card-text">Class: {quiz.class}</p>
                  <p className="card-text">Subject: {quiz.subject}</p>
                  <p className="card-text date">Started at: {quiz.startDate}</p>
                </div>
                <div className="card-footer text-center">
                  {!isQuizDone(quiz._id) && (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleAboutPage(quiz)}
                      style={{ animation: "fadeIn 0.5s" }}
                    >
                      let's go
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        {about && <AboutQuiz quiz={selectedQuiz} userInfo={userInfo} />}
      </div>
    </div>
  );
};

export default QuizComponent;
