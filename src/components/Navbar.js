import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <div className="nav">
    <Typography variant="overline">
      <NavLink to="/">Random Fact</NavLink>
    </Typography>

    <Typography variant="overline">
      <NavLink to="/all">All Facts</NavLink>
    </Typography>
    <Typography variant="overline">
      <NavLink to="/new">Add New Fact</NavLink>
    </Typography>
  </div>
);

export default Navbar;
