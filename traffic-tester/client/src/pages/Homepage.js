import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";

const Homepage = () => {
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
  let xyArr = [];
  let states = [];
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  let windSpeed = [];
  let tq2AccCount = [];

  let tq3_accYr1 = [];
  let tq3_accYr2 = [];
  let tq3_accYr3 = [];
  let tq3_accYr4 = [];
  let tq3_accYr5 = [];
  let tq3_accYr6 = [];
  let tq3_hrs = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [options3, setOptions3] = useState(null);

  const getQuery = async (query) => {
    const response = await axios.get("http://localhost:4000/get", {
      params: { query },
    });

    return response.data[0];
  };

  const getQuery1 = async (query) => {
    const response = await axios.get("http://localhost:4000/get", {
      params: { query },
    });

    return response.data;
  };

  let tq1;
  let tq2;
  let tq3;

  useEffect(() => {
    /*
     * Query that will give you the state with highest amount of accidents in a specific year
     * and month. To change the year edit 2018 in both places and change 3 to the month in
     * both places
     */
    const fetchTQ1 = async () => {
      const promises = nums.map(async (num) => {
        let query = `
        SELECT DVULOPAS.location.state AS State, COUNT(AID) AS Count
        FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
        WHERE EXTRACT(YEAR FROM START_TIME) = 2018 AND
        EXTRACT(MONTH FROM START_TIME) = ${num} GROUP BY DVULOPAS.location.state
        HAVING COUNT(AID) = (SELECT MAX(acc_count) FROM(
        SELECT COUNT(AID) acc_count
        FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
        WHERE EXTRACT(YEAR FROM START_TIME) = 2018 AND EXTRACT(MONTH FROM START_TIME) = ${num}
        GROUP BY DVULOPAS.location.state))
        `;
        const res = await getQuery(query);
        res.push(num);
        states.push(res[0]);
        xyArr.push({ x: res[2], y: res[1] });
        //console.log(xyArr);

        return res;
      });
      tq1 = await Promise.all(promises);
      setData({
        labels: states,
        datasets: [
          {
            label: "Highest Accident State Each Month in 2018",
            data: xyArr,
          },
        ],
      });

      setIsLoading1(false);
      //console.log(tq1[0]);
    };
    fetchTQ1();

    // /*Query that will give you count of accidents for every wind speed*/
    // const fetchTQ2 = async () => {
    //   const getData = async () => {
    //     let query = `
    //     SELECT ROUND(WIND_SPEED, 0), COUNT(AID)
    //     FROM DVULOPAS.Accident NATURAL JOIN DVULOPAS.Weather
    //     WHERE WIND_SPEED < 73
    //     GROUP BY ROUND(WIND_SPEED, 0)
    //     ORDER BY ROUND(WIND_SPEED, 0)
    //     `;
    //     const res = await getQuery1(query);
    //     res.forEach((element) => {
    //       windSpeed.push(element[0]);
    //       tq2AccCount.push(element[1]);
    //     });

    //     //console.log(res);
    //     return res;
    //   };

    //   tq2 = await getData();
    //   setData2({
    //     labels: windSpeed,
    //     datasets: [
    //       {
    //         label: "Accident Count Per Wind Speed",
    //         data: tq2AccCount,
    //       },
    //     ],
    //   });

    //   setIsLoading2(false);
    //   //console.log(tq1[0]);
    // };
    // fetchTQ2();

    /*Query that will give you count of accidents for every hour for each year in all states*/
    const fetchTQ3 = async () => {
      const getData = async () => {
        let query = `
         SELECT EXTRACT(YEAR FROM START_TIME) Year, EXTRACT(HOUR FROM START_TIME) Hour_Of_Day, COUNT(AID)
         FROM DVULOPAS.accident
         GROUP BY EXTRACT(YEAR FROM START_TIME), EXTRACT(HOUR FROM START_TIME)
         ORDER BY  EXTRACT(YEAR FROM START_TIME), EXTRACT(HOUR FROM START_TIME)
         `;
        const res = await getQuery1(query);
        res.forEach((element) => {
          if (element[0] == 2016) {
            tq3_accYr1.push({ x: element[1], y: element[2] });
          } else if (element[0] == 2017) {
            tq3_accYr2.push({ x: element[1], y: element[2] });
          } else if (element[0] == 2018) {
            tq3_accYr3.push({ x: element[1], y: element[2] });
          } else if (element[0] == 2019) {
            tq3_accYr4.push({ x: element[1], y: element[2] });
          } else if (element[0] == 2020) {
            tq3_accYr5.push({ x: element[1], y: element[2] });
          } else if (element[0] == 2021) {
            tq3_accYr6.push({ x: element[1], y: element[2] });
          }
        });

        console.log(res);
        return res;
      };

      tq3 = await getData();
      setData3({
        labels: tq3_hrs,
        datasets: [
          {
            label: "2016",
            data: tq3_accYr1,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "2017",
            data: tq3_accYr2,
            fill: false,
            borderColor: "rgb(220, 100, 12)",
            tension: 0.1,
          },
          {
            label: "2018",
            data: tq3_accYr3,
            fill: false,
            borderColor: "rgb(25, 11, 100)",
            tension: 0.1,
          },
          {
            label: "2019",
            data: tq3_accYr4,
            fill: false,
            borderColor: "rgb(49, 55, 162)",
            tension: 0.1,
          },
          {
            label: "2020",
            data: tq3_accYr5,
            fill: false,
            borderColor: "rgb(99, 103, 24)",
            tension: 0.1,
          },
          {
            label: "2021",
            data: tq3_accYr6,
            fill: false,
            borderColor: "rgb(125, 122, 1)",
            tension: 0.1,
          },
        ],
      });

      setOptions3({
        scales: {
          x: {
            title: {
              display: true,
              text: "Hour (24hr Format)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Accident Frequency",
            },
          },
        },
      });

      setIsLoading3(false);
      //console.log(tq1[0]);
    };
    fetchTQ3();
  }, []);

  // const data13 = {
  //   labels: tq3_hrs,
  //   datasets: [
  //     {
  //       label: "2016",
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //     {
  //       label: "2017",
  //       data: [12, 55, 444, 1, 55, 12, 40],
  //       fill: false,
  //       borderColor: "rgb(220, 100, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  return (
    <div>
      <h1 style={{ fontSize: "45px" }}>Trend Queries</h1>
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
      <h2>Highest Accident State Each Month (2018)</h2>
      {isLoading1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Scatter data={data} />
        </div>
      )}
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
      <h2>Accidents vs. Wind Speed</h2>
      {isLoading2 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>{/* <Line data={data2} /> */}</div>
      )}
      <h2>Correlation between accident frequency and hour of day</h2>
      {isLoading3 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Line data={data3} options={options3} />
        </div>
      )}
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
    </div>
  );
};

export default Homepage;
