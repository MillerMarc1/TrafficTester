import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";

const Load = ({}) => {
  //Dummy queries that are just used to display on the list of previously saved queries
  const queries = ["q1", "q2"];
  return (
    <Box>
      <Stack direction={"row"} height={"600px"}>
        <Stack alignItems={"center"} pl={"10px"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Load
          </Typography>
        </Stack>
        <Box
          margin={"auto"}
          bgcolor={"white"}
          mt={"100px"}
          width={"500px"}
          height={"600px"}
        >
          {queries?.map((query, i) => (
            <Typography
              key={i}
              value={query}
              variant="h6"
              m="4px"
              color={"#804F3B"}
            >
              {query}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default Load;
