import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";

const Graph = () => {
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  //const [options, setOptions] = useState([]);

  //Dummy set of options just to display some data in dropdown menus
  const options = ["2016", "2017", "2018", "2019", "2020", "2021"];

  //This function executes when the Graph page is loaded
  useEffect(() => {
    //Get years from data set and set options to years
    //setOptions()
  }, []);

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignItems={"center"} pl={"10px"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Graph
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"50px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h4">
              Time
            </Typography>
            <Stack minWidth={"200px"} spacing={"12px"}>
              <FormControl fullWidth>
                <InputLabel id="graph-time-select-1">-Select-</InputLabel>
                <Select
                  labelId="graph-time-select-1"
                  value={time1}
                  label={"-Select-"}
                  onChange={(event) => {
                    setTime1(event.target.value);
                  }}
                >
                  {options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography style={{ color: "#804F3B" }} variant="h6">
                to
              </Typography>
              <FormControl>
                <InputLabel id="graph-time-select-2">-Select-</InputLabel>
                <Select
                  labelId="graph-time-select-2"
                  value={time2}
                  label={"-Select-"}
                  onChange={(event) => {
                    setTime2(event.target.value);
                  }}
                >
                  {options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Button
            href="/edit"
            variant="outlined"
            size="large"
            sx={{
              marginTop: "100px",
              width: "150px",
              color: "#804F3B",
              borderColor: "#804F3B",
            }}
          >
            Edit
          </Button>
          <Stack direction={"row"} mt={"180px"} spacing={"8px"}>
            <Button
              href="/load"
              variant="outlined"
              size="large"
              sx={{
                width: "100px",
                color: "#804F3B",
                borderColor: "#804F3B",
              }}
            >
              Load
            </Button>
            <Button
              href="/save"
              variant="outlined"
              size="large"
              sx={{
                width: "100px",
                color: "#804F3B",
                borderColor: "#804F3B",
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
        <Box margin={"auto"}>Graph goes here</Box>
      </Stack>
    </Box>
  );
};

export default Graph;
