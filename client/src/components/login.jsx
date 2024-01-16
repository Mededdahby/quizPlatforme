import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const [errorLogin, setErrorLogin] = useState(false)

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
        const result = await response.json();
        console.log(result.token);
        localStorage.setItem("token", result.token);
        navigate("/");
        setLoginPage(false);
        console.log("Login successful!");
      } else {
        setErrorLogin(true)
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    loginPage && (
      <Container  component="main" maxWidth="xs">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1} textAlign="left">
          </Box>
          <Box flexGrow={1} textAlign="right">
          </Box>

        </Box>

        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
                    {
            errorLogin &&
            <Typography className={styles.loginFalse}>
              your password or email is wrong
            </Typography>
          }
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  placeholder="Your Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    )
  );
};

export default Login;
