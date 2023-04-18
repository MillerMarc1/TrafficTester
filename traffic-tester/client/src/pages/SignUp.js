import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "@mui/material";
import bcrypt from "bcryptjs";
import axios from "axios";

const salt = bcrypt.genSaltSync(10);
let user = "";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitPressed, setSubmitPressed] = useState(false);
  // -1 = inital state, 0 = invalid, 1 = valid
  const [validation, setValidation] = useState({
    firstName: -1,
    lastName: -1,
    email: -1,
    username: -1,
    password: -1,
  });

  const validateEmail = (email) => {
    if (email == "" || email.includes("@")) {
      return 1;
    } else {
      return 0;
    }
  };

  const handleSignUp = () => {
    setSubmitPressed(true);
    const errors = {
      firstName: firstName === "" ? 0 : 1,
      lastName: lastName === "" ? 0 : 1,
      email: validateEmail(email),
      username: username === "" ? 0 : 1,
      password: password === "" ? 0 : 1,
    };

    setValidation(errors);

    if (
      errors.firstName == 1 &&
      errors.lastName == 1 &&
      errors.email == 1 &&
      errors.username == 1 &&
      errors.password == 1
    ) {
      const hash = bcrypt.hashSync(password, salt);
      console.log("Successfully registered");
      console.log(firstName, lastName, email, username, hash);
      user = `'${firstName}', '${lastName}','${email}','${username}','${hash}'`;
      console.log(user);
      addUser();
      reset();
    }
  };

  const addUser = async () => {
    const response = await axios.post("http://localhost:4000/addUser", {
      user,
    });
    console.log(response.data);
  };

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    user = "";
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#804F3B" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography variant="h3" color="#804F3B">
          Sign Up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={handleFirstName}
                value={firstName}
                label="First Name"
                error={submitPressed && validation.firstName == 0}
                helperText={
                  submitPressed && validation.firstName == 0 && "Required Field"
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={handleLastName}
                value={lastName}
                label="Last Name"
                error={submitPressed && validation.lastName == 0}
                helperText={
                  submitPressed && validation.lastName == 0 && "Required Field"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={handleEmail}
                value={email}
                label="Email Address"
                error={submitPressed && validation.email == 0}
                helperText={
                  submitPressed && validation.email == 0 && "Incorrect Format"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleUsername}
                value={username}
                label="Username"
                error={submitPressed && validation.username == 0}
                helperText={
                  submitPressed && validation.username == 0 && "Required Field"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handlePassword}
                value={password}
                label="Password"
                type="password"
                error={submitPressed && validation.password == 0}
                helperText={
                  submitPressed && validation.password == 0 && "Required Field"
                }
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSignUp}
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "000",
              color: "#804F3B",
              borderColor: "#804F3B",
              border: 2,
              mt: 3,
              mb: 2,
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
