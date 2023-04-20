import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My App</Typography>
        <Button component={Link} to="/homepage" color="inherit">
          Homepage
        </Button>
        <Button component={Link} to="/graph" color="inherit">
          Interactive Graph
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
