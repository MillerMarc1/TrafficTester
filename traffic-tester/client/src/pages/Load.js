import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

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
          <Stack direction={"row"} mt={"500px"}>
            <Button
              href="/graph"
              variant="outlined"
              size="large"
              sx={{
                width: "130px",
                color: "#804F3B",
                borderColor: "#804F3B",
              }}
            >
              Back to Graph
            </Button>
          </Stack>
        </Stack>
        <Box
          margin={"auto"}
          bgcolor={"white"}
          mt={"100px"}
          width={"500px"}
          height={"600px"}
        >
          <Stack>
            {
              //onClick load the graph with settings already saved
              queries?.map((query, i) => (
                <Button href="/graph">
                  <Typography
                    key={i}
                    value={query}
                    variant="h6"
                    m="4px"
                    color={"#804F3B"}
                  >
                    {query}
                  </Typography>
                </Button>
              ))
            }
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Load;
