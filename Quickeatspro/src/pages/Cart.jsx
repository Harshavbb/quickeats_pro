import React from "react";
import { useCart } from "../context/CartContext";
import { Box, Typography, Card, CardContent, Button, Grid, IconButton, Divider, Paper } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

function Cart() {
  const { cart, addToCart, removeFromCart, decrementQuantity } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box sx={{ backgroundColor: "#F5F5DC", minHeight: "100vh", padding: "30px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", textAlign: "center", mb: 3 }}>
        🛒 Your Shopping Cart
      </Typography>

      {cart.length > 0 ? (
        <>
          <Grid container spacing={3} justifyContent="center">
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ backgroundColor: "#FFFFFF", boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E", mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#E07B39" }}>
                      ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                    </Typography>

                    {/* Quantity Control Buttons */}
                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <IconButton onClick={() => decrementQuantity(item.id)} sx={iconButtonStyle}>
                        <Remove />
                      </IconButton>
                      <Typography variant="body1" sx={{ fontWeight: "bold", mx: 2 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => addToCart(item)} sx={iconButtonStyle}>
                        <Add />
                      </IconButton>
                    </Box>

                    {/* Remove Button */}
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      startIcon={<Delete />}
                      sx={removeButtonStyle}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Checkout Section */}
          <Paper sx={checkoutContainerStyle}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#E07B39" }}>
              Total: ₹{totalPrice}
            </Typography>
            <Button variant="contained" sx={checkoutButtonStyle}>
              Proceed to Checkout
            </Button>
          </Paper>
        </>
      ) : (
        <Typography variant="h6" sx={{ color: "#B6A28E", textAlign: "center", mt: 4 }}>
          Your cart is empty.
        </Typography>
      )}
    </Box>
  );
}

// Styles for buttons and UI elements
const iconButtonStyle = {
  backgroundColor: "#E07B39",
  color: "white",
  "&:hover": { backgroundColor: "#B6A28E" },
};

const removeButtonStyle = {
  backgroundColor: "#B6A28E",
  color: "white",
  fontSize: "14px",
  fontWeight: "bold",
  mt: 2,
  "&:hover": { backgroundColor: "#E07B39" },
};

const checkoutContainerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#DCE4C9",
  padding: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 -3px 5px rgba(0, 0, 0, 0.1)",
};

const checkoutButtonStyle = {
  backgroundColor: "#E07B39",
  color: "white",
  fontWeight: "bold",
  "&:hover": { backgroundColor: "#B6A28E" },
};

export default Cart;
