import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import QuizComponent from "./components/StudentSide/QuizComponent";
import Profside from "./components/ProfSide/Profside";
import styles from "./components/ProfSide/home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  async function getuserData() {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await fetch("http://localhost:5000/getUserToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const result = await response.json();
      setUserData(result);
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    getuserData();
  }, []);
  async function handleLogOut() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.welcome}>Welcome {userData.fullname}</div>
        <button onClick={handleLogOut}>Logout</button>
      </nav>

      {(userData.role == "student") && <QuizComponent userInfo={userData} />}
      {(userData.role == "prof") && <Profside userInfo={userData} />}
    </>
  );
}
