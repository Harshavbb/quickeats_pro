import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#B6A28E",
        color: "white",
        textAlign: "center",
        padding: "20px 0",
        mt: 5,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {/* Quick Links */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" sx={linkStyle}>Home</Link><br />
          <Link href="/menu" color="inherit" sx={linkStyle}>Menu</Link><br />
          <Link href="/cart" color="inherit" sx={linkStyle}>Cart</Link><br />
          <Link href="/contact" color="inherit" sx={linkStyle}>Contact</Link>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <IconButton href="#" sx={iconStyle}><FacebookIcon /></IconButton>
          <IconButton href="#" sx={iconStyle}><InstagramIcon /></IconButton>
          <IconButton href="#" sx={iconStyle}><TwitterIcon /></IconButton>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Typography variant="body2" sx={{ mt: 3, fontSize: "14px" }}>
        © {new Date().getFullYear()} Quick Eats. All Rights Reserved.
      </Typography>
    </Box>
  );
};

// Styles
const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "14px",
  "&:hover": { textDecoration: "underline" },
};

const iconStyle = {
  color: "white",
  "&:hover": { color: "#E07B39" },
};

export default Footer;
