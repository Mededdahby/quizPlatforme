import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import styles from './login.module.css';

const Login = () => {
  const navigate = useNavigate(); // Change to useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  const AuthUser = async (user) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.message === "worked") {

        localStorage.setItem('token', result.data.accesToken);
        navigate("/");
      } else {
        console.log("login failed");
        setErrorLogin(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = { email: email, password: password };

    AuthUser(userInfo);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="gmail">Email:</label>
        <input type="email" id="gmail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <input type="submit" value="Login" />
        {errorLogin && <p className={styles.error}>Username or password incorrect!</p>}
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;
