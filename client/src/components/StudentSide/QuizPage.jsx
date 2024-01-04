import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import styles from "./quizPage.module.css";

const QuizPage = ({ quizData, userInfo }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timeDisplay, setTimeDisplay] = useState(true);
  const [closeButton, setCloseButton] = useState(true);




  useEffect(() => {}, []);

  const handleAnswerChange = (selectedOption) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = selectedOption;
      return newAnswers;
    });
  };

  const calculateScore = async () => {
    let scor = 0;

    quizData.questions.forEach((question, index) => {
      const correctAnswer = question.correctOption.toString(); // Convert to string
      const userAnswer = answers[index];
      console.log(userAnswer);
      console.log(correctAnswer);
      if (correctAnswer == userAnswer) {
        scor += 1;
      }
    });
    alert(`Your results is : ${scor}`);
    return scor;
  };

  const handleSaveAnswers = async () => {
    const data = {
      userId: userInfo.userId,
      quizId: quizData._id,
      score: await calculateScore(),
      answers,
      fullname: userInfo.fullname,
      quiztitle: quizData.title,
    };

    try {
      const response = await fetch("http://localhost:5000/studentAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  const handleSubmit = async () => {
    handleSaveAnswers();
    setTimeDisplay(false);
    setCloseButton(false);
    setShowNextQuestion(true);
    window.location.reload();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowNextQuestion(false);
  };

  return (
    <div className={styles.containerFluid}>
      
      <div className={styles.timeDisplay}>
        {timeDisplay && (
          <Countdown
            date={Date.now() + timeLeft * 1000}
            onComplete={handleNextQuestion}
            renderer={({ seconds }) => (
              <p className={styles.timeLeft}>Time left: {seconds} seconds</p>
            )}
          />
        )}
      </div>

      {currentQuestionIndex < quizData.questions.length && (
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>
              {quizData.questions[currentQuestionIndex].text}
            </h5>
            <ul className={styles.listUnstyled}>
              {quizData.questions[currentQuestionIndex].options.map(
                (option) => (
                  <li key={option.id} className={styles.mb2}>
                    <div className={styles.formCheck}>
                      <input
                        className={styles.formCheckInput}
                        type="radio"
                        name={`question_${quizData.questions[currentQuestionIndex].id}`}
                        value={option.id}
                        checked={answers[currentQuestionIndex] === option.id}
                        onChange={() => handleAnswerChange(option.id)}
                      />
                      <label
                        className={`${styles.formCheckLabel} ${styles.ms2}`}
                      >
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
              <h4 className={styles}>
                Your selected answer: {answers[currentQuestionIndex]}
              </h4>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
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
          className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default QuizPage;
