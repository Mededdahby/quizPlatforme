
import React, { useState, useEffect } from "react";
import AboutQuiz from "./AboutQuiz";
import styles from "./quizComponnet.module.css"; // Import the CSS module

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

    const qcmid = qcmIds.filter((e) => e.quizId == quizId);
    return qcmid.length > 0;
  }

  useEffect(() => {
    getQuizInfo();
    getMyData();
  }, []);

  return (
    <div className={styles.containerFluid}>
      <div className={styles.row}>
        {" "}
        {compenentPage &&
          quizzes.map((quiz, i) => (
            <div key={i} className={`${styles.colMd4} ${styles.mb4}`}>
              {" "}
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  {" "}
                  <h5 className={styles.cardTitle}>{quiz.title}</h5>
                  <p className={styles.cardText}>Class: {quiz.class}</p>
                  <p className={styles.cardText}>Subject: {quiz.subject}</p>
                  <p className={`${styles.cardText} ${styles.date}`}>
                    Started at: {quiz.startDate}
                  </p>{" "}
                </div>
                <div className={styles.cardFooter}>
                  {!isQuizDone(quiz._id) ? (
                    <h1 className={styles.infoCrad}>Already Passed</h1>
                  ) : (
                    <button
                      className={`${styles.btn} ${styles.btnOutlineSuccess}`}
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
