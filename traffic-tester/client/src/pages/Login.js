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
          <Button
            href="/graph"
            variant="outlined"
            size="large"
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
          <text> Don't have an account?&nbsp;</text>
          <Link href="/SignUp" variant="body2">
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
