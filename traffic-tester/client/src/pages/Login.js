import React from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";

const Login = () => {
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
        <TextField defaultValue={"Username"} />
        <TextField defaultValue={"Password"} />
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
