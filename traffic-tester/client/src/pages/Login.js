import React, { useState } from "react";
import {
  Link,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    bcrypt.compare(password, await getUser(), function (err, result) {
      if (result) {
        console.log("match");
        navigate("/Homepage");
      } else {
        console.log("no match");
        alert("Incorrent username/password");
      }
    });
  };

  const getUser = async () => {
    const response = await axios.get("http://localhost:4000/getUser", {
      params: { username },
    });

    return response.data[0][0];
  };

  return (
    <div>
      <Box>
        <Stack alignItems={"center"} spacing={1}>
          <Typography
            style={{ color: "#804F3B" }}
            variant="h1"
            mt="50px"
            mb="50px"
          >
            Traffic Tester
          </Typography>
          <TextField
            required
            label="Username"
            value={username}
            onChange={handleUsername}
          />
          <TextField
            required
            label="Password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <Button
            //href="/graph"
            variant="outlined"
            size="large"
            onClick={handleLogin}
            sx={{
              backgroundColor: "000",
              color: "#804F3B",
              borderColor: "#804F3B",
              border: 2,
            }}
          >
            Login
          </Button>
        </Stack>
      </Box>
      <Grid justifyContent="center">
        <Grid item>
          <p>
            Don't have an account?&nbsp;
            <Link href="/SignUp" variant="body2">
              Sign Up
            </Link>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
