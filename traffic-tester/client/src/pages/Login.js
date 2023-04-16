import React, { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";

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
    <Box>
      <Stack alignItems={"center"}>
        <Typography
          style={{ color: "#804F3B" }}
          variant="h1"
          mt="50px"
          mb="50px"
        >
          Traffic Tester
        </Typography>
        <TextField
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <TextField
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <Button
          href="/graph"
          variant="outlined"
          size="large"
          sx={{
            backgroundColor: "000",
            marginTop: "100px",
            color: "#804F3B",
            borderColor: "#804F3B",
          }}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
