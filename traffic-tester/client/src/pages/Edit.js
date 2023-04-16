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
  TextField,
} from "@mui/material";

const Edit = () => {
  //Dummy lines that are just used to display on the list of currently displayed lines
  const lines = [
    "Los Angeles - Total Accidents",
    "Orlando - Total Accident",
    "Chicago - Total Accidents",
  ];

  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");
  const [scope1, setScope1] = useState("");
  const [andOr, setAndOr] = useState("");
  const [scope2, setScope2] = useState("");
  const [variable, setVariable] = useState("");

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignItems={"left"} pl={"15px"}>
          <Typography
            style={{ color: "#804F3B" }}
            variant="h3"
            mt="50px"
            align="left"
          >
            Edit Graph
          </Typography>
          {
            //Location dropdown menu
          }
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Location
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={locationType}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setLocationType(event.target.value);
                  }}
                >
                  {/* {locationTypes.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              placeholder="Location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              sx={{
                width: "250px",
              }}
            />
          </Stack>
          {
            //Scope1 dropdown menu
          }
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Scope
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={scope1}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setScope1(event.target.value);
                  }}
                >
                  {/* {options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {
            //And/Or dropdown menu
          }
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              And/Or
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={andOr}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setAndOr(event.target.value);
                  }}
                >
                  {/* {options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {
            //Scope2 dropdown menu
          }
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Scope
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={scope2}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setScope2(event.target.value);
                  }}
                >
                  {/* {options.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {
            //Variable dropdown menu
          }
          <Stack
            direction={"row"}
            alignItems={"center"}
            mt={"30px"}
            spacing={"20px"}
          >
            <Typography style={{ color: "#804F3B" }} variant="h6">
              Variable
            </Typography>
            <Stack minWidth={"200px"} spacing={"5px"}>
              <FormControl fullWidth>
                <InputLabel id="location-select-1">-Select-</InputLabel>
                <Select
                  labelId="location-select-1"
                  value={variable}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setVariable(event.target.value);
                  }}
                >
                  {/* {variables.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            size="large"
            sx={{
              backgroundColor: "000",
              marginTop: "100px",
              color: "#804F3B",
              borderColor: "#804F3B",
              width: "200px",
              ml: "50px",
            }}
            //OnClick -> add new line to graph and display in "Currently Displaying"
          >
            Add Line
          </Button>
          <Button
            href="/graph"
            variant="outlined"
            size="large"
            sx={{
              width: "200px",
              mt: "10px",
              color: "#804F3B",
              borderColor: "#804F3B",
              ml: "50px",
            }}
          >
            Back to Graph
          </Button>
        </Stack>

        <Stack ml={"400px"}>
          <Typography style={{ color: "#804F3B" }} variant="h5" mt="50px">
            Currently Displaying (Max 10)
          </Typography>
          <Box
            margin={"auto"}
            bgcolor={"white"}
            mt={"20px"}
            width={"500px"}
            height={"600px"}
          >
            <Stack>
              {lines?.map((line, i) => (
                <Typography
                  key={i}
                  value={line}
                  variant="h6"
                  m={"2px"}
                  color={"#804F3B"}
                >
                  {line}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Edit;
