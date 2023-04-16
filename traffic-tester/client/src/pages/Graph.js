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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    //Get years from date set and set options to years
    //setOptions()
  }, []);

  const handleSelect = (event) => {
    setTime1(event.target.value);
    setTime2(event.target.value);
  };

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignItems={"center"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Graph
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={"20px"}>
            <Typography style={{ color: "#804F3B" }} variant="h4">
              Time
            </Typography>
            <Stack minWidth={"200px"} spacing={"12px"}>
              <FormControl fullWidth>
                <InputLabel id="graph-time-select-1">-Select-</InputLabel>
                <Select
                  labelId="graph-time-select-1"
                  value={time1}
                  label={"-Select"}
                  onChange={handleSelect}
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
                  label={"-Select"}
                  onChange={handleSelect}
                >
                  {options.map((option, i) => (
                    <MenuItem key={i}>{option}</MenuItem>
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
        </Stack>
        //Graph goes here
      </Stack>
    </Box>
  );
};

export default Graph;
