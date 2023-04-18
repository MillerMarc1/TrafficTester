import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Box, CircularProgress, Container } from "@mui/material";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";

const Homepage = () => {
  const years = [2016, 2017, 2018, 2019, 2020, 2021];
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getQuery1 = async (query) => {
    const response = await axios.get("http://localhost:4000/get", {
      params: { query },
    });

    return response.data[0][0];
  };

  useEffect(() => {
    const fetchAccidents = async () => {
      const promises = years.map(async (year) => {
        let query = `SELECT COUNT(*) FROM CSV WHERE EXTRACT(YEAR FROM START_TIME) = '${year}'`;
        const res = await getQuery1(query);
        return res;
      });
      const accidents = await Promise.all(promises);
      setData({
        labels: years,
        datasets: [
          {
            label: "Accidents Per Year",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: accidents,
          },
        ],
      });
      setIsLoading(false);
    };

    fetchAccidents();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "45px" }}>Trend Queries</h1>
      <hr
        style={{
          background: "#000000",
          height: "1px",
        }}
      />
      <h2>Accidents Over The Years</h2>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Bar data={data} />
      )}
      <hr
        style={{
          background: "#000000",
          height: "4px",
        }}
      />
      <h2>Accidents Over The Years</h2>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
};

export default Homepage;
