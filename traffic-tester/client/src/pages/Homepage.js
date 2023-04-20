import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Bar, Line, Scatter, Bubble } from "react-chartjs-2";
import Navbar from "./Navbar";

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

  let tq4_yrMo = [];
  let tq4_day = [];
  let tq4_night = [];

  let tq5_yrMo = [];
  let tq5_stopSign = [];
  let tq5_tLight = [];

  let tq6_yrMo = new Set();
  let tq6_accBro = [];
  let tq6_accDuv = [];
  let tq6_accHil = [];
  let tq6_accLee = [];
  let tq6_accMan = [];
  let tq6_accMia = [];
  let tq6_accOra = [];
  let tq6_accPal = [];
  let tq6_accPin = [];
  let tq6_accSar = [];

  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const [data4, setData4] = useState(null);
  const [data5, setData5] = useState(null);
  const [data6, setData6] = useState(null);
  const [tupleCount, setTupleCount] = useState(null);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [isLoading5, setIsLoading5] = useState(true);
  const [isLoading6, setIsLoading6] = useState(true);
  const [isLoading7, setIsLoading7] = useState(true);
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

  let tq;
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

    /*Query that will give you count of accidents for every wind speed*/
    const fetchTQ2 = async () => {
      const getData = async () => {
        let query = `
        SELECT ROUND(WIND_SPEED, 0), COUNT(AID)
        FROM DVULOPAS.Accident NATURAL JOIN DVULOPAS.Weather
        WHERE WIND_SPEED < 73
        GROUP BY ROUND(WIND_SPEED, 0)
        ORDER BY ROUND(WIND_SPEED, 0)
        `;
        const res = await getQuery1(query);
        res.forEach((element) => {
          windSpeed.push(element[0]);
          tq2AccCount.push(element[1]);
        });

        //console.log(res);
        return res;
      };

      tq2 = await getData();
      setData2({
        labels: windSpeed,
        datasets: [
          {
            label: "Accident Count Per Wind Speed",
            data: tq2AccCount,
          },
        ],
      });

      setIsLoading2(false);
      //console.log(tq1[0]);
    };
    fetchTQ2();

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

        //console.log(res);
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

    /*Query that will give you count of accidents for every month of every year in one specific state 
separated by Daytime(6:00am-5:59pm) or Nighttime(6:00pm - 5:59am).*/
    const fetchTQ4 = async () => {
      const getData = async () => {
        let query = `
        SELECT TO_CHAR(START_TIME, 'YYYY-MM') Year_Month, COUNT(AID) DayCount, NightCount
        FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
        JOIN(
            SELECT EXTRACT(YEAR FROM START_TIME) nYear, EXTRACT(MONTH FROM START_TIME) nMonth, COUNT(AID) NightCount
            FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.location
            WHERE DVULOPAS.location.state = 'FL' 
            AND (EXTRACT(HOUR FROM START_TIME) < 6 OR EXTRACT(HOUR FROM START_TIME) > 18)
            GROUP BY EXTRACT(MONTH FROM START_TIME), EXTRACT(YEAR FROM START_TIME)
        )ON  EXTRACT(YEAR FROM START_TIME) = nYear AND EXTRACT(MONTH FROM START_TIME) = nMonth 
        AND (EXTRACT(HOUR FROM START_TIME) >= 6 AND EXTRACT(HOUR FROM START_TIME) < 18)
        GROUP BY EXTRACT(MONTH FROM START_TIME), EXTRACT(YEAR FROM START_TIME), NightCount, TO_CHAR(START_TIME, 'YYYY-MM')
        ORDER BY EXTRACT(YEAR FROM START_TIME), EXTRACT(MONTH FROM START_TIME)`;
        const res = await getQuery1(query);
        res.forEach((element) => {
          tq4_yrMo.push(element[0]);
          tq4_day.push(element[1]);
          tq4_night.push(element[2]);
        });

        //console.log(res);
        return res;
      };

      tq = await getData();
      setData4({
        labels: tq4_yrMo,
        datasets: [
          {
            label: "Day",
            data: tq4_day,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Night",
            data: tq4_night,
            fill: false,
            borderColor: "rgb(220, 100, 12)",
            tension: 0.1,
          },
        ],
      });

      setIsLoading4(false);
      //console.log(tq1[0]);
    };
    fetchTQ4();

    /*Query that will give you count of accidents for every month separated by Stop Sign or Traffic Light.*/
    const fetchTQ5 = async () => {
      const getData = async () => {
        let query = `
        SELECT TO_CHAR(START_TIME, 'YYYY-MM') Year_Month, COUNT(AID) Stop_Sign, Traffic_Light
        FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.POI
        JOIN(
            SELECT TO_CHAR(START_TIME, 'YYYY-MM') nYear_Month, COUNT(AID) Traffic_Light
            FROM DVULOPAS.accident NATURAL JOIN DVULOPAS.POI
            WHERE TRAFFIC_SIGNAL = 1
            GROUP BY TO_CHAR(START_TIME, 'YYYY-MM')
        )ON TO_CHAR(START_TIME, 'YYYY-MM') = nYear_Month
        WHERE STOP = 1
        GROUP BY TO_CHAR(START_TIME, 'YYYY-MM'), Traffic_Light
        ORDER BY TO_CHAR(START_TIME, 'YYYY-MM')`;
        const res = await getQuery1(query);
        res.forEach((element) => {
          tq5_yrMo.push(element[0]);
          tq5_stopSign.push(element[1]);
          tq5_tLight.push(element[2]);
        });

        //console.log(res);
        return res;
      };

      tq = await getData();
      setData5({
        labels: tq5_yrMo,
        datasets: [
          {
            label: "Stop Sign",
            data: tq5_stopSign,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Traffic Light",
            data: tq5_tLight,
            fill: false,
            borderColor: "rgb(220, 100, 12)",
            tension: 0.1,
          },
        ],
      });

      setIsLoading5(false);
      //console.log(tq1[0]);
    };
    fetchTQ5();

    /*Query that will give you count of accidents for the top 10 most dangerous counties in florida each month.*/
    /*Query that will give you count of accidents for every month separated by Stop Sign or Traffic Light.*/
    const fetchTQ6 = async () => {
      const getData = async () => {
        let query = `
        SELECT TO_CHAR(START_TIME, 'YYYY-MM') Year_Month, County, COUNT(AID) FROM DVULOPAS.Location NATURAL JOIN DVULOPAS.Accident
        WHERE COUNTY IN (
        SELECT COUNTY
            FROM DVULOPAS.Location NATURAL JOIN DVULOPAS.Accident
            WHERE State = 'FL'
            GROUP BY COUNTY
            ORDER BY COUNT(AID) DESC
            FETCH FIRST 10 ROWS ONLY
        )
        AND (EXTRACT(MONTH FROM START_TIME) > 5 OR EXTRACT(YEAR FROM START_TIME) > 2016)
        GROUP BY TO_CHAR(START_TIME, 'YYYY-MM'), County
        ORDER BY TO_CHAR(START_TIME, 'YYYY-MM'), County`;
        const res = await getQuery1(query);
        res.forEach((element) => {
          tq6_yrMo.add(element[0]);
          switch (element[1]) {
            case "Broward":
              tq6_accBro.push(element[2]);
              break;
            case "Duval":
              tq6_accDuv.push(element[2]);
              break;
            case "Hillsborough":
              tq6_accHil.push(element[2]);
              break;
            case "Lee":
              tq6_accLee.push(element[2]);
              break;
            case "Manatee":
              tq6_accMan.push(element[2]);
              break;
            case "Miami-Dade":
              tq6_accMia.push(element[2]);
              break;
            case "Orange":
              tq6_accOra.push(element[2]);
              break;
            case "Palm Beach":
              tq6_accPal.push(element[2]);
              break;
            case "Pinellas":
              tq6_accPin.push(element[2]);
              break;
            case "Sarasota":
              tq6_accSar.push(element[2]);
              break;
            default:
              // code block
              break;
          }
        });

        return res;
      };

      tq = await getData();
      setData6({
        labels: Array.from(tq6_yrMo),
        datasets: [
          {
            label: "Broward",
            data: tq6_accBro,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Duval",
            data: tq6_accDuv,
            fill: false,
            borderColor: "rgb(220, 100, 12)",
            tension: 0.1,
          },
          {
            label: "Hillsborough",
            data: tq6_accHil,
            fill: false,
            borderColor: "rgb(25, 11, 100)",
            tension: 0.1,
          },
          {
            label: "Lee",
            data: tq6_accLee,
            fill: false,
            borderColor: "rgb(49, 55, 162)",
            tension: 0.1,
          },
          {
            label: "Manatee",
            data: tq6_accMan,
            fill: false,
            borderColor: "rgb(99, 103, 24)",
            tension: 0.1,
          },
          {
            label: "Miami-Dade",
            data: tq6_accMia,
            fill: false,
            borderColor: "rgb(125, 122, 1)",
            tension: 0.1,
          },
          {
            label: "Orange",
            data: tq6_accOra,
            fill: false,
            borderColor: "rgb(22, 55, 33)",
            tension: 0.1,
          },
          {
            label: "Palm Beach",
            data: tq6_accPal,
            fill: false,
            borderColor: "rgb(99, 13, 11)",
            tension: 0.1,
          },
          {
            label: "Pinellas",
            data: tq6_accPin,
            fill: false,
            borderColor: "rgb(23, 122, 21)",
            tension: 0.1,
          },
          {
            label: "Sarasota",
            data: tq6_accSar,
            fill: false,
            borderColor: "rgb(43, 22, 51)",
            tension: 0.1,
          },
        ],
      });

      setIsLoading6(false);
      //console.log(tq1[0]);
    };
    fetchTQ6();

    const fetchTupleCount = async () => {
      let query = `
      SELECT SUM(num_rows) FROM (
        SELECT COUNT(*) AS num_rows FROM DVULOPAS.ACCIDENT
        UNION ALL SELECT COUNT(*) AS num_rows FROM DVULOPAS.LOCATION
        UNION ALL SELECT COUNT(*) AS num_rows FROM DVULOPAS.PERIOD_OF_DAY
        UNION ALL SELECT COUNT(*) AS num_rows FROM DVULOPAS.POI
        UNION ALL SELECT COUNT(*) AS num_rows FROM DVULOPAS.USERSTEST
        UNION ALL SELECT COUNT(*) AS num_rows FROM DVULOPAS.WEATHER
      )`;
      const res = await getQuery1(query);
      setTupleCount(res);

      setIsLoading7(false);
      return res;
    };
    fetchTupleCount();
  }, []);

  return (
    <div align="center">
      <Navbar></Navbar>
      <h1 style={{ fontSize: "45px" }}>Trend Queries</h1>
      <hr
        style={{
          background: "#000000",
          height: "0.5px",
        }}
      />
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
      <h2>Accident Frequency Day vs. Night</h2>
      {isLoading4 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Line data={data4} />
        </div>
      )}
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
      <h2>Accident Frequency Near POI (Stop Sign vs. Traffic Light)</h2>
      {isLoading5 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Line data={data5} />
        </div>
      )}
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
      <h2>County</h2>
      {isLoading6 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Line data={data6} />
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
        <div>
          <Line data={data2} />{" "}
        </div>
      )}
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />

      {isLoading7 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>Total Tuple Count: {tupleCount}</div>
      )}
    </div>
  );
};

export default Homepage;
