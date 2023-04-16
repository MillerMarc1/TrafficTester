import * as React from "react";
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
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="First Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Email Address" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Password" />
            </Grid>
          </Grid>
          <Button
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
