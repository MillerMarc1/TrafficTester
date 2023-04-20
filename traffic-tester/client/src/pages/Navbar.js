import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledImg = styled("img")({
  height: 32,
  marginLeft: 16,
});

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#804F3B" }}>
      <Toolbar>
        <Typography variant="h6">Traffic Tester</Typography>
        <StyledImg
          src={require("../assets/animated-collision.gif")}
          alt="loading..."
        />
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button component={Link} to="/homepage" color="inherit">
            Homepage
          </Button>
          <Button component={Link} to="/graph" color="inherit">
            Interactive Graph
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
