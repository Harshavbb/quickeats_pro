import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const { currentUser, role } = useAuth();
  const { cart } = useCart(); // Get cart items
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="sticky" sx={navbarStyle}>
      <Toolbar sx={toolbarStyle}>
        {/* Logo */}
        <Typography variant="h5" sx={logoStyle}>
          Quick Eats
        </Typography>

        {/* Search Bar */}
        <Box sx={searchContainerStyle}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={searchFieldStyle}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon sx={{ color: "#E07B39" }} />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box>
          <Button component={Link} to="/" sx={navButtonStyle}>Home</Button>
          <Button component={Link} to="/menu" sx={navButtonStyle}>Menu</Button>

          {currentUser ? (
            role === "admin" ? (
              <>
                <Button component={Link} to="/admindashboard" sx={navButtonStyle}>Dashboard</Button>
                <Button component={Link} to="/orders" sx={navButtonStyle}>Orders</Button>
              </>
            ) : (
              <>
                {/* Cart with Badge */}
                <IconButton component={Link} to="/cart" sx={iconButtonStyle}>
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon fontSize="large" sx={{ color: "#E07B39" }} />
                  </Badge>
                </IconButton>
              </>
            )
          ) : (
            <>
              <Button component={Link} to="/login" sx={navButtonStyle}>Login</Button>
              <Button component={Link} to="/signup" sx={navButtonStyle}>Signup</Button>
            </>
          )}

          {/* Profile Dropdown */}
          {currentUser && (
            <>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={iconButtonStyle}>
                <AccountCircleIcon fontSize="large" sx={{ color: "#E07B39" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={menuStyle}
              >
                <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

/* --- STYLING --- */
const navbarStyle = {
  backgroundColor: "rgb(244, 245, 246)",
  padding: "10px 20px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  maxWidth: "1200px",
  width: "100%",
  margin: "0 auto",
};

const logoStyle = {
  fontWeight: "500",
  color: "#E07B39",
};

const searchContainerStyle = {
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
};

const searchFieldStyle = {
  width: "300px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "#f5f5f5",
    "&:hover fieldset": { borderColor: "#E07B39" },
    "&.Mui-focused fieldset": { borderColor: "#E07B39" },
  },
};

const navButtonStyle = {
  color: "#E07B39",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 10px",
  "&:hover": { backgroundColor: "#DCE4C9" },
};

const iconButtonStyle = {
  margin: "0 10px",
};

const menuStyle = {
  "& .MuiPaper-root": {
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Navbar;
