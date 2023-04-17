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

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (firstName == "")
      console.log(firstName, lastName, email, username, password);
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
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={handleLastName}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleEmail}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleUsername}
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handlePassword}
                label="Password"
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
