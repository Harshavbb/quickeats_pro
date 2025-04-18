import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { styled } from "@mui/system";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import RiceBowlIcon from "@mui/icons-material/RiceBowl"; // For Biryanis
import HeroImage from "../assets/quickhome.png"; // Use local PNG
import Footer from "../components/Footer";

// Define categories
const categories = [
  { name: "Veg", icon: <LocalDiningIcon sx={{ fontSize: 50, color: "#E07B39" }} /> },
  { name: "Non-Veg", icon: <FastfoodIcon sx={{ fontSize: 50, color: "#E07B39" }} /> },
  { name: "Chinese", icon: <RamenDiningIcon sx={{ fontSize: 50, color: "#E07B39" }} /> },
  { name: "Bakery", icon: <BakeryDiningIcon sx={{ fontSize: 50, color: "#E07B39" }} /> },
  { name: "Biryanis", icon: <RiceBowlIcon sx={{ fontSize: 50, color: "#E07B39" }} /> },
];

// Styled components
const HeroSection = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#F5F5DC",
  padding: "0 5%",
  width: "100vw",  // Make it occupy the full screen width
  height: "100vh",
  background: "linear-gradient(to bottom, #e07b39, #f5f5dc)", 
});

const HeroTextContainer = styled(Box)({
  maxWidth: "50%",
  textAlign: "left",
});

const HeroImageContainer = styled("img")({
  width: "45%",
  maxWidth: "600px",
  borderRadius: "10px",
});

const SearchInput = styled(TextField)({
  width: "100%",
  backgroundColor: "white",
  borderRadius: "5px",
});

// Home Component
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", searchQuery); // Can be used for filtering menu items
  };

  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      {/* Hero Section */}
      <HeroSection>
        {/* Left Side: Text */}
        <HeroTextContainer>
          <Typography variant="h3" sx={{ fontWeight: "regular", color: "#FFFFFF" }}>
            Order Fresh & Fast <br /> from Your College Canteen!
          </Typography>
          <SearchInput
            placeholder="Search for food..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ mt: 2, width: "80%" }}
          />
          <Box sx={{ mt: 3 }}>
            <Button component={Link} to="/menu" sx={ctaButtonStyle}>
              View Menu
            </Button>
          </Box>
        </HeroTextContainer>

        {/* Right Side: Image */}
        <HeroImageContainer src={HeroImage} alt="People enjoying food" />
      </HeroSection>

      {/* Categories Section */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", mb: 3 }}>
          Explore Categories
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Box sx={{ textAlign: "center", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.1)" } }}>
                {category.icon}
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1, color: "#B6A28E" }}>
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works */}
      <Box sx={{ textAlign: "center", mt: 8, pb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", mb: 3 }}>
          How It Works
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E" }}>
              1. Browse Menu
            </Typography>
            <Typography variant="body1" sx={{ color: "#5A5A5A" }}>
              Explore a variety of delicious food options.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E" }}>
              2. Add to Cart
            </Typography>
            <Typography variant="body1" sx={{ color: "#5A5A5A" }}>
              Select your favorite dishes and add them to the cart.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E" }}>
              3. Order & Enjoy
            </Typography>
            <Typography variant="body1" sx={{ color: "#5A5A5A" }}>
              Place your order and get ready to enjoy your meal!
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

// CTA Button Styles
const ctaButtonStyle = {
  backgroundColor: "#E07B39",
  color: "white",
  fontWeight: "regular",
  fontSize: "16px",
  margin: "0 10px",
  padding: "10px 20px",
  borderRadius: "20px",
  "&:hover": { backgroundColor: "#B6A28E" },
};

export default Home;
