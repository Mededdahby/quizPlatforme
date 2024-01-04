import React, { useState, useEffect } from "react";
import styles from "./home.module.css";

function Home({ userInfo }) {
  // State variables
  const [phase, setPhase] = useState("main");
  const [qcms, setQcms] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [classValue, setClassValue] = useState("isil");
  const [subject, setSubject] = useState("java");
  const [correctAnswer, setCorrectAnswer] = useState("a");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [questionsContent, setQuestionsContent] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userResponses, setUserResponses] = useState([]);

  // Fetch QCMs on component mount
  useEffect(() => {
    getqcms();
    getUsersResponses()
  }, []);

  // Fetch QCMs from backend
  async function getqcms() {
    const res = await fetch("http://localhost:5000/data");
    const qcms = await res.json();
    setQcms(qcms);
  }
  async function getUsersResponses() {
    const res = await fetch("http://localhost:5000/getresponses")
    const responses = await res.json()
    console.log(responses)
    setUserResponses(responses)
  }

  // Handle adding a new question
  const handleNewQuestion = () => {
    const question = {
      text: questionsContent,
      options: [
        { id: "A", text: answerA },
        { id: "B", text: answerB },
        { id: "C", text: answerC },
      ],
      correctOption: correctAnswer,
    };

    setQuestions((prevQuestions) => {
      return prevQuestions.length === 0
        ? [question]
        : [...prevQuestions, question];
    });

    // Clear input fields
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setCorrectAnswer("a");
    setQuestionsContent("");
  };

  // Add QCM to the backend
  async function addQcmBackend(qcm) {
    try {
      const response = await fetch("http://localhost:5000/addqcm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qcm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reset phase to "main" and fetch updated QCMs
      setPhase("main");
      getqcms();
      const data = await response.json();
      console.log("QCM added successfully:", data);
    } catch (error) {
      console.error("Error adding QCM:", error);
    }
  }

  // Handle adding a new quiz
  const handleAddQuiz = (e) => {
    e.preventDefault();
    const question = {
      text: questionsContent,
      options: [
        { id: "A", text: answerA },
        { id: "B", text: answerB },
        { id: "C", text: answerC },
      ],
      correctOption: correctAnswer,
    };

    const newQuestions = Array.isArray(questions)
      ? [...questions, question]
      : [question];

    const maxId = qcms.reduce((max, qcm) => (qcm.id > max ? qcm.id : max), -1);

    const newQCM = {
      id: maxId + 1,
      title,
      questions: newQuestions,
      class: classValue,
      subject,
      startDate,
      startTime,
      dueDate,
      dueTime,
      publishedBy: userInfo.fullname,
      isPublished: false,
    };

    // Add new QCM to the backend
    addQcmBackend(newQCM);

    // Clear input fields
    setTitle("");
    setStartDate("");
    setStartTime("");
    setDueDate("");
    setDueTime("");
    setClassValue("isil");
    setSubject("");
    setAnswerA("");
    setAnswerB("");
    setAnswerC("");
    setCorrectAnswer("a");
    setQuestionsContent("");
  };

  // Handle QCM deletion
  const deleteQcm = async (qcmid) => {
    const response = await fetch("http://localhost:5000/deleteqcm", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qcmid: qcmid }),
    });

    // Fetch updated QCMs after deletion
    getqcms();
  };

  return (
    <>
      <div className={styles.main}>
        {
          (phase == "addquiz") ? (
            <form onSubmit={handleAddQuiz} >
              <div className={styles.inputfield}>
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="title of QCM"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <label>Date and Time to Start:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <label>Due Date and Time:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                />
              </div>
              <div className={styles.inputfield}>
                <label htmlFor="classSelect">Class:</label>
                <select
                  value={classValue}
                  onChange={(e) => setClassValue(e.target.value)}
                >
                  <option value="isil">ISIL</option>
                  <option value="erdd">ERDD</option>
                  <option value="mbf">MBF</option>
                  <option value="mge">MGE</option>
                </select>
              </div>
              <div className={styles.inputfield}>
                <label>Subject:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="java">Java</option>
                  <option value="uml">UML</option>
                  <option value="web">Web</option>
                  <option value="database">Data Base</option>
                </select>
              </div>
              <div className={styles.addqustions}>
                <input
                  type="text"
                  placeholder="Question"
                  required
                  value={questionsContent}
                  onChange={(e) => setQuestionsContent(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="A"
                  required
                  value={answerA}
                  onChange={(e) => setAnswerA(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="B"
                  required
                  value={answerB}
                  onChange={(e) => setAnswerB(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="C"
                  required
                  value={answerC}
                  onChange={(e) => setAnswerC(e.target.value)}
                />

                <div className={styles.inputfield}>
                  <label>Correct Answer:</label>
                  <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                  >
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                  </select>
                </div>
                <div className={styles.actions}>
                  <button onClick={handleNewQuestion}>New Question</button>
                </div>
              </div>
              <button type="submit">Create</button>
            </form>
          ) : (phase == "main") ? (
            <>
              <div className={styles.buttons}>
                <div className={styles.addquiz}>
                  <button
                    className={styles.addquizbutton}
                    onClick={() => setPhase("addquiz")}
                  >
                    Add Quiz
                  </button>
                </div>
                <div>
                  <button onClick={() => setPhase("results")}>
                    Say Student Results
                  </button>
                </div>
              </div>


              <div className={styles.qcms}>
                {qcms.map((qcm, index) => (
                  <div className={styles.qcm} key={index}>
                    <div className={styles.smalldata}>
                      Title : <div className={styles.title}>{qcm.title}</div>
                    </div>
                    <div className={styles.smalldata}>
                      Class : <div className={styles.class}>{qcm.class}</div>
                    </div>
                    <div className={styles.smalldata}>
                      Subject :{" "}
                      <div className={styles.subject}>{qcm.subject}</div>
                    </div>
                    <div className={styles.smalldata}>
                      Start Date :{" "}
                      <div className={styles.startdate}>
                        {qcm.startDate} {qcm.startTime}
                      </div>
                    </div>
                    <div className={styles.smalldata}>
                      Due Date :{" "}
                      <div className={styles.duedate}>
                        {qcm.dueDate} {qcm.dueTime}
                      </div>
                    </div>
                    <div className={styles.smalldata}>
                      Published By :{" "}
                      <div className={styles.prof}>{qcm.publishedBy}</div>
                    </div>
                    {qcm.publishedBy == userInfo.fullname && (
                      <div className={styles.actions}>
                        <button onClick={() => deleteQcm(qcm._id)}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.resultscontainer}>
              <button onClick={() => setPhase("main")}> go home</button>
              <div className={styles.students}>
                {
                  userResponses.map((s, key) => (
                    <div key={key} className={styles.student}>
                      <div className={styles.score}>score : {s.scor}</div>
                      <div className={styles.user}>Name : {s.fullname}</div>
                      <div className={styles.user}>qcm title : {s.quiztitle}</div>
                    </div>
                  ))
                }
              </div>
            </div>

          )
        }
      </div>
    </>
  );
}

export default Home;
