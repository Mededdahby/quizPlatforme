import React, { useState, useEffect } from 'react';
import styles from './home.module.css';



function Home() {
  async function getqcms() {
    const res = await fetch("http://localhost:5000/data")
    const qcms = await res.json()
    console.log(qcms)
    setQcms(qcms)
  }

  useEffect(() => {
    getqcms()
  }, [])
  const [isAddQuiz, setIsAddQuiz] = useState(false);
  const [qcms, setQcms] = useState([]);


  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const [classValue, setClassValue] = useState('isil');
  const [subject, setSubject] = useState('java');
  const [correctAnswer, setCorrectAnswer] = useState('a');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [questionsContent, setQuestionsContent] = useState('');
  const [questions, setQuestions] = useState([]);


  const handleNewQuestion = () => {
    const question = {
      content: questionsContent,
      answerA: answerA,
      answerB: answerB,
      answerC: answerC,
      correctAnswer: correctAnswer
    }
    setQuestions(previousQuestions => [...previousQuestions, question])
    setAnswerA('')
    setAnswerB('')
    setAnswerC('')
    setCorrectAnswer('a')
    setQuestionsContent('')

  }

  async function addQcmBackend(qcm) {
    try {
      const response = await fetch("http://localhost:3000/addqcm", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qcm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getqcms()
      const data = await response.json();
      console.log('QCM added successfully:', data);
    } catch (error) {
      console.error('Error adding QCM:', error);
    }
  }


  const handleAddQuiz = (e) => {
    e.preventDefault();
    const question = {
      content: questionsContent,
      answerA: answerA,
      answerB: answerB,
      answerC: answerC,
      correctAnswer: correctAnswer
    }
    const maxId = qcms.reduce((max, question) => (question.id > max ? question.id : max), -1);


    const newQCM = {
      id: maxId + 1,
      title,
      questions: [...questions, question],
      class: classValue,
      subject,
      startDate,
      startTime,
      dueDate,
      dueTime,
      publishedBy: "said",
      isPublished: false
    }
    addQcmBackend(newQCM)
    setTitle('');
    setStartDate('');
    setStartTime('');
    setDueDate('');
    setDueTime('')
    setClassValue('isil');
    setSubject('');
    setIsAddQuiz(false);
    setAnswerA('')
    setAnswerB('')
    setAnswerC('')
    setCorrectAnswer('a')
    setQuestionsContent('')
  };
  const deleteQcm = async (titleQcm) => {
    console.log(titleQcm)
    const response = await fetch("http://localhost:3000/deleteqcm", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ qcmName: titleQcm }),
    });

    getqcms()
  }

  return (
    <>
      <nav className={styles.navbar}>
        <button className={styles.logoutbutton}>logout</button>
        <div className={styles.welcome}>Welcome Back Prof - Said</div>
      </nav>

      <div className={styles.main}>
        {isAddQuiz ? (
          <form onSubmit={handleAddQuiz}>
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
                type="text" placeholder='Question' required
                value={questionsContent}
                onChange={(e) => setQuestionsContent(e.target.value)}
              />
              <input
                type="text" placeholder='A' required
                value={answerA}
                onChange={(e) => setAnswerA(e.target.value)}
              />
              <input
                type="text" placeholder='B' required
                value={answerB}
                onChange={(e) => setAnswerB(e.target.value)}
              />
              <input
                type="text" placeholder='C' required
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
        ) : (
          <>
            <div className={styles.addquiz}>
              <button
                className={styles.addquizbutton}
                onClick={() => setIsAddQuiz(true)}
              >
                Add Quiz
              </button>
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
                    Subject : <div className={styles.subject}>{qcm.subject}</div>
                  </div>
                  <div className={styles.smalldata}>
                    Start Date :{' '}
                    <div className={styles.startdate}>{qcm.startDate} {qcm.startTime}</div>
                  </div>
                  <div className={styles.smalldata}>
                    Due Date : <div className={styles.duedate}>{qcm.dueDate} {qcm.dueTime}</div>
                  </div>
                  <div className={styles.smalldata}>
                    Published By :{' '}
                    <div className={styles.prof}>{qcm.publishedBy}</div>
                  </div>
                  {
                    (qcm.publishedBy == "said") && (
                      <div className={styles.actions}>
                        <button onClick={() => deleteQcm(qcm.title)}>Delete</button>
                      </div>
                    )
                  }

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
