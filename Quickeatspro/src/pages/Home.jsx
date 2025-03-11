import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#E07B39", mb: 2 }}>
        Welcome to Quick Eats!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Delicious food, fresh & fast. Order now!
      </Typography>

      {/* Image Fix (Check Image Path) */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img
          src="/assets/food-image.jpg" // Make sure this path is correct
          alt="Food"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button component={Link} to="/menu" variant="contained" sx={{ backgroundColor: "#E07B39", mr: 2 }}>
          View Menu
        </Button>
        <Button component={Link} to="/signup" variant="contained" sx={{ backgroundColor: "#B6A28E" }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
