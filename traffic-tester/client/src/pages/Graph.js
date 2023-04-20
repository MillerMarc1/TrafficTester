import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const years = [2016, 2017, 2018, 2019, 2020, 2021];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const getQuery = async (query) => {
    const response = await axios.get("http://localhost:4000/get", {
      params: { query },
    });

    return response.data[0][0];
  };

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
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              State
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={state}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                >
                  {states.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Year
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={year}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                >
                  {years.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Month
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={month}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setMonth(event.target.value);
                  }}
                >
                  {months.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
        <Box margin={"auto"}>Graph goes here</Box>
      </Stack>
    </Box>
  );
};

export default Graph;
