import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const foodItems = [
  { id: 1, name: "Cheese Burger", price: "₹120", img: "https://source.unsplash.com/150x150/?burger" },
  { id: 2, name: "Pizza", price: "₹250", img: "https://source.unsplash.com/150x150/?pizza" },
  { id: 3, name: "Pasta", price: "₹180", img: "https://source.unsplash.com/150x150/?pasta" },
];

function Menu() {
  return (
    <Box sx={{ textAlign: "center", padding: "20px", backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", marginBottom: "20px" }}>
        Our Menu
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {foodItems.map((item) => (
          <Card key={item.id} sx={{ width: 250, backgroundColor: "#DCE4C9", boxShadow: 3, borderRadius: "10px" }}>
            <CardMedia component="img" height="150" image={item.img} alt={item.name} />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E" }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#E07B39" }}>{item.price}</Typography>
              <Button sx={{ ...menuButtonStyle, width: "100%", marginTop: "10px" }}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

// ✅ Fix: Define button style for Menu Page
const menuButtonStyle = {
  backgroundColor: "#E07B39",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "8px 15px",
  borderRadius: "8px",
  "&:hover": { backgroundColor: "#B6A28E" },
};

export default Menu;
