import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";

function Navbar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#E07B39", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: "1200px", width: "100%", margin: "0 auto"}}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
          Quick Eats
        </Typography>
        <Box>
          <Button component={Link} to="/" sx={navButtonStyle}>Home</Button>

          {currentUser ? (
            <>
              <Button component={Link} to="/menu" sx={navButtonStyle}>Menu</Button>
              <Button component={Link} to="/cart" sx={navButtonStyle}>Cart</Button>
              <Button component={Link} to="/profile" sx={navButtonStyle}>Profile</Button>
              <Button onClick={handleLogout} sx={{ ...navButtonStyle, backgroundColor: "#B6A28E" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={navButtonStyle}>Login</Button>
              <Button component={Link} to="/signup" sx={navButtonStyle}>Signup</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Define button styles
const navButtonStyle = {
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0 10px",
  "&:hover": { backgroundColor: "#DCE4C9", color: "#E07B39" },
};

export default Navbar;
