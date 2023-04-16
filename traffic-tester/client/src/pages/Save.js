import React, { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";

const Save = () => {
  const [name, setName] = useState("");
  const [queries, setQueries] = useState([]);

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignItems={"center"} pl={"10px"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Save
          </Typography>
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            sx={{
              width: "200px",
            }}
          />
          <Button
            href="/graph"
            variant="outlined"
            size="large"
            sx={{
              marginTop: "15px",
              width: "120px",
              color: "#804F3B",
              borderColor: "#804F3B",
            }}
          >
            Save
          </Button>
        </Stack>
        <Box margin={"auto"}>Graph goes here</Box>
      </Stack>
    </Box>
  );
};

export default Save;
