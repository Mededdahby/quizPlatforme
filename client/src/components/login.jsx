// Login.jsx
import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // TODO: we will add new things
        // * redirection
        const result = await response.json();
        console.log(result.token);
        localStorage.setItem("token", result.token);
        navigate("/");
        // ? validation
        setLoginPage(false);
        console.log("Login successful!");
      } else {
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    loginPage && (
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <label className={styles.label}>
          email:
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    )
  );
};

export default Login;
