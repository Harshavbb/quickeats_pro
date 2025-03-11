import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Container, TextField, Button, Typography, Select, MenuItem, Checkbox, FormControlLabel, Box } from "@mui/material";

const AdminDashboard = () => {
  const { role, currentUser } = useAuth();  // ✅ Role-based access check
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("veg");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isVeg, setIsVeg] = useState(true);
  const [available, setAvailable] = useState(true);

  if (role !== "admin") {
    return <p>You do not have permission to access this page.</p>;
  }

  const addFoodItem = async () => {
    if (!foodName || !price || !imageUrl || !description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "food"), {
        name: foodName,
        category,
        price: Number(price),
        description,
        imageUrl,
        isVeg,
        available,
        createdAt: serverTimestamp(),
        addedBy: currentUser?.uid,  // ✅ Restored tracking of which admin added it
        favoritedBy: [],
      });
      alert("Food item added successfully!");

      // Reset form
      setFoodName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setIsVeg(true);
      setAvailable(true);
    } catch (error) {
      alert("Error adding food item: " + error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#E07B39", mb: 2 }}>
        Admin Dashboard - Manage Food
      </Typography>

      {/* Image Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <img
          src="https://img.freepik.com/free-vector/people-carrying-they-food-from-market_52683-33995.jpg?t=st=1741715746~exp=1741719346~hmac=31db9f5f77c75a94b17bf50ea8535d2f5906e7e7d48a9ff5ed12e02b25d54a71&w=1380"
          alt="Food Management"
          style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
        />
      </Box>

      {/* Form Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: "400px", margin: "0 auto" }}>
        <TextField label="Food Name" variant="filled" fullWidth sx={{ backgroundColor: "#fff", borderRadius: "5px" }} value={foodName} onChange={(e) => setFoodName(e.target.value)} />

        <Select value={category} onChange={(e) => setCategory(e.target.value)} variant="filled" fullWidth sx={{ backgroundColor: "#fff", borderRadius: "5px" }}>
          <MenuItem value="veg">Veg</MenuItem>
          <MenuItem value="non-veg">Non-Veg</MenuItem>
          <MenuItem value="chinese">Chinese</MenuItem>
          <MenuItem value="bakery">Bakery</MenuItem>
          <MenuItem value="drinks">Drinks</MenuItem>
          <MenuItem value="pizzas">Pizzas</MenuItem>
          <MenuItem value="burgers">Burgers</MenuItem>
          <MenuItem value="biryanis">Biryanis</MenuItem>
          <MenuItem value="rotis">Rotis</MenuItem>
        </Select>

        <TextField label="Price (₹)" variant="filled" fullWidth type="number" sx={{ backgroundColor: "#fff", borderRadius: "5px" }} value={price} onChange={(e) => setPrice(e.target.value)} />

        <TextField label="Description" variant="filled" fullWidth multiline rows={3} sx={{ backgroundColor: "#fff", borderRadius: "5px" }} value={description} onChange={(e) => setDescription(e.target.value)} />

        <TextField label="Image URL" variant="filled" fullWidth sx={{ backgroundColor: "#fff", borderRadius: "5px" }} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <FormControlLabel control={<Checkbox checked={isVeg} onChange={(e) => setIsVeg(e.target.checked)} />} label="Vegetarian" />

        <FormControlLabel control={<Checkbox checked={available} onChange={(e) => setAvailable(e.target.checked)} />} label="Available" />

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#E07B39",
            color: "white",
            "&:hover": { backgroundColor: "#B6A28E" },
            mt: 2,
          }}
          onClick={addFoodItem}
        >
          Add Food Item
        </Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
