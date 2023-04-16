import React, { useState } from "react";
import { Box, Stack, Typography, TextField, Button, Grid } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
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
            value={password}
            onChange={handlePassword}
          />
        </Stack>
      </Box>
      <Box alignItems={"center"}>
        <Button
          href="/graph"
          variant="outlined"
          size="large"
          sx={{
            backgroundColor: "000",
            color: "#804F3B",
            borderColor: "#804F3B",
            border: 2,
            marginTop: "10px",
            marginRight: "5px",
          }}
        >
          Login
        </Button>
        <Button
          href="/SignUp"
          variant="outlined"
          size="large"
          sx={{
            backgroundColor: "000",
            color: "#804F3B",
            borderColor: "#804F3B",
            border: 2,
            marginTop: "10px",
            marginLeft: "5px",
          }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default Login;
