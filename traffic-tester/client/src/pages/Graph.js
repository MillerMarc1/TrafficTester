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
  CircularProgress,
} from "@mui/material";
import { Line, Scatter } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Navbar from "./Navbar";

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
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let xyArr = [];
  let statesList = [];
  let tq1;

  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [queryType, setQueryType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    labels: nums,
    datasets: [
      {
        label: `Highest Number of Accident in ${state} Each Month in ${year}`,
        data: nums,
      },
    ],
  });

  const getQuery = async (query) => {
    const response = await axios.get("http://localhost:4000/get", {
      params: { query },
    });

    return response.data;
  };

  const fetchData = async () => {
    setIsLoading(true);
    let query = `SELECT EXTRACT(MONTH FROM START_TIME) AS MONTH, COUNT(AID) AS Count
    FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
    WHERE EXTRACT(YEAR FROM START_TIME) = '${year}' AND location.state = '${state}'
    GROUP BY EXTRACT(MONTH FROM START_TIME)
    ORDER BY EXTRACT(MONTH FROM START_TIME)`;
    const res = await getQuery(query);
    console.log(res);

    setData({
      labels: res.map((data) => {
        return months[data[0] - 1];
      }),
      datasets: [
        {
          label: `Number of Accidents in ${state} Each Month in ${year}`,
          data: res.map((data) => {
            return data[1];
          }),
        },
      ],
    });
    setIsLoading(false);
  };

  const fetchTQ1 = async () => {
    setIsLoading(true);
    setState("");
    const promises = nums.map(async (num) => {
      let query = `
      SELECT DVULOPAS.location.state AS State, COUNT(AID) AS Count
      FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
      WHERE EXTRACT(YEAR FROM START_TIME) = ${year} AND
      EXTRACT(MONTH FROM START_TIME) = ${num} GROUP BY DVULOPAS.location.state
      HAVING COUNT(AID) = (SELECT MAX(acc_count) FROM(
      SELECT COUNT(AID) acc_count
      FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
      WHERE EXTRACT(YEAR FROM START_TIME) = ${year} AND EXTRACT(MONTH FROM START_TIME) = ${num}
      GROUP BY DVULOPAS.location.state))
      `;
      const res = await getQuery(query);
      res.push(num);
      statesList.push(res[0][0]);
      console.log(statesList);
      xyArr.push({ x: res[1], y: res[0][1] });
      console.log(xyArr);
      return res;
    });
    tq1 = await Promise.all(promises);
    setData({
      labels: statesList,
      datasets: [
        {
          label: `Highest Accident State Each Month in ${year}`,
          data: xyArr,
        },
      ],
    });

    setIsLoading(false);
    //console.log(tq1[0]);
  };

  //This function executes when the Graph page is loaded
  useEffect(() => {
    if (queryType == "t1") {
      fetchData();
    } else if (queryType == "t2") {
      fetchTQ1();
    } else {
    }
  }, [year, state, queryType]);

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
              Query
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={queryType}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setQueryType(event.target.value);
                    console.log(queryType);
                  }}
                >
                  <MenuItem value={"t1"}>Highest Number of Accidents</MenuItem>
                  <MenuItem value={"t2"}>Highest Accident State</MenuItem>
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
          <Box marginTop={"50px"}>
            {queryType == "t1" ? (
              <Typography style={{ color: "#804F3B" }} variant="h6">
                Select both Year and State
              </Typography>
            ) : (
              <Typography></Typography>
            )}
            {queryType == "t2" ? (
              <Typography style={{ color: "#804F3B" }} variant="h6">
                Select just Year
              </Typography>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        </Stack>
        <Box
          width={"1000px"}
          height={"800px"}
          marginLeft={"100px"}
          marginTop={"100px"}
        >
          {isLoading ? (
            <CircularProgress />
          ) : //<Typography margin={"auto"}>Select a year and state</Typography>
          queryType == "t1" ? (
            <Line data={data} />
          ) : (
            <Scatter data={data} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Graph;
