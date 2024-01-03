// components/AboutQuiz.jsx
import React, { useState } from "react";
import QuizPage from "./QuizPage";
import QuizComponent from "./QuizComponent";
import styles from "./aboutQuiz.module.css"; // Import the CSS module

const AboutQuiz = ({ quiz, userInfo }) => {
  const [quizPage, setQuizPage] = useState(false);
  const [aboutPage, setAboutPage] = useState(true);
  const [compPage, setCompPage] = useState(false);

  const handleQuizPage = () => {
    setAboutPage(false);
    setQuizPage(true);
  };

  const handleComponantPage = () => {
    setAboutPage(false);
    setQuizPage(false);
    setCompPage(true);
  };

  return (
    <div className={styles.container}>
      {aboutPage && (
        <div className={styles.card}>
          {" "}
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{quiz.title}</h2>
            <p className={styles.cardText}>Class: {quiz.class}</p>
            <p className={styles.cardText}>Subject: {quiz.subject}</p>
            <p className={styles.cardText}>Start Date: {quiz.startDate}</p>
            <p className={styles.cardText}>Start Time: {quiz.startTime}</p>
            <p className={styles.cardText}>Due Date: {quiz.dueDate}</p>
            <p className={styles.cardText}>Due Time: {quiz.dueTime}</p>
            <p className={styles.cardText}>Published By: {quiz.publishedBy}</p>
            <button
              className={`${styles.btn} ${styles.btnOutlineSuccess}`}
              onClick={handleQuizPage}
            >
              Ready
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutlineDanger}`}
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
