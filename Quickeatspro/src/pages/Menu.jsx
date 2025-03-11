import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext"; // Import cart context

function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const querySnapshot = await getDocs(collection(db, "food"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoodItems(items);
    };

    fetchFoodItems();
  }, []);

  return (
    <Box sx={{ textAlign: "center", padding: "20px", backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", marginBottom: "20px" }}>
        Our Menu
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <Card key={item.id} sx={{ width: 250, backgroundColor: "#DCE4C9", boxShadow: 3, borderRadius: "10px" }}>
             <CardMedia
                component="img"
                height="150"
                image={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback if broken
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#B6A28E" }}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "#E07B39" }}>₹{item.price}</Typography>
                <Button
                  sx={{ ...menuButtonStyle, width: "100%", marginTop: "10px" }}
                  onClick={() => addToCart(item)}
                  disabled={cart.some(cartItem => cartItem.id === item.id)} // Disable if already added
                >
                  {cart.some(cartItem => cartItem.id === item.id) ? "Added" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No food items available</Typography>
        )}
      </Box>
    </Box>
  );
}

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
