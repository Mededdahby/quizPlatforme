import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import QuizComponent from "./QuizComponent";

const QuizPage = ({ quizData, userInfo }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timeDisplay, setTimeDisplay] = useState(true);
  const [closeButton, setCloseButton] = useState(true);
  const [compPage, setCompPage] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [userId, setUserId] = useState("");
  const [scor, setScor] = useState(0);

  useEffect(() => {
    // setQuizId(quizData.id);
    // setUserId(quizInfo.id);
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSaveAnswers = async () => {
    console.log(userInfo._id);
    console.log(userInfo);
    try {
      const response = await fetch("http://localhost:5000/studentAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo.userId,
          quizId: quizData._id,
          scor,
          answers,
        }),
      });

      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    handleSaveAnswers();
    setTimeDisplay(false);
    setCloseButton(false);
    setCompPage(true);
    setShowNextQuestion(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowNextQuestion(false);
  };

  return (
    <div className="container-fluid ">
      <div className=" ">
        {timeDisplay && (
          <Countdown
            date={Date.now() + timeLeft * 1000}
            onComplete={handleNextQuestion}
            renderer={({ seconds }) => <p>Time left: {seconds} seconds</p>}
          />
        )}
      </div>

      {currentQuestionIndex < quizData.questions.length && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {quizData.questions[currentQuestionIndex].text}
            </h5>
            <ul className="list-unstyled">
              {quizData.questions[currentQuestionIndex].options.map(
                (option) => (
                  <li key={option.id} className="mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question_${quizData.questions[currentQuestionIndex].id}`}
                        value={option.id}
                        checked={
                          answers[
                            quizData.questions[currentQuestionIndex].id
                          ] === option.id
                        }
                        onChange={() =>
                          handleAnswerChange(
                            quizData.questions[currentQuestionIndex].id,
                            option.id
                          )
                        }
                      />
                      <label className="form-check-label ms-2">
                        {option.text}
                      </label>
                    </div>
                  </li>
                       
                )
              )}
            </ul>
          </div>

          {showNextQuestion || (
            <>
              <h4 className="alert alert-warning">
                Your selected answer:{" "}
                {answers[quizData.questions[currentQuestionIndex].id]}
              </h4>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </>
          )}
        </div>
      )}

      {currentQuestionIndex === quizData.questions.length && closeButton && (
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {compPage && <QuizComponent />}
    </div>
  );
};

export default QuizPage;
