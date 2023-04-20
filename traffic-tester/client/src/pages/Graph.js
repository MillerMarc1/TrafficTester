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
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

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

  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  //This function executes when the Graph page is loaded
  useEffect(() => {
    const fetchData = async () => {
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
      //setIsLoading(false);
    };

    fetchData();
  }, [year, state]);

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
        </Stack>
        <Box
          width={"1000px"}
          height={"800px"}
          marginLeft={"100px"}
          marginTop={"100px"}
        >
          {isLoading ? (
            <Typography margin={"auto"}>Select a year and state</Typography>
          ) : (
            <Line data={data} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Graph;
