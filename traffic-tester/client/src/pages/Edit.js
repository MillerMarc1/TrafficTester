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

const Edit = () => {
  const [location, setLocation] = useState("");
  const [scope1, setScope1] = useState("");
  const [andOr, setAndOr] = useState("");
  const [scope2, setScope2] = useState("");
  const [variable, setVariable] = useState("");

  return (
    <Box>
      <Stack direction={"row"}>
        <Stack alignItems={"center"} pl={"10px"}>
          <Typography style={{ color: "#804F3B" }} variant="h3" m="50px">
            Edit Graph
          </Typography>
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
                  value={location}
                  size="large"
                  label={"-Select-"}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                >
                  {/* {locations.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))} */}
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
            }}
            //OnClick -> add new line to graph and display in "Currently Displaying"
          >
            Add Line
          </Button>
        </Stack>

        <Stack ml={"500px"}>
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
            <Stack>{}</Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Edit;
