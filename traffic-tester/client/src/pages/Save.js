import React, { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";

const Save = () => {
  const [name, setName] = useState("");

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignContent={"center"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Save
          </Typography>
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></TextField>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Save;
