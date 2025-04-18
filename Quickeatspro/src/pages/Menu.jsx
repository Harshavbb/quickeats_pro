import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Box, Card, CardMedia, Typography, Button, TextField, MenuItem, Select } from "@mui/material";
import { useCart } from "../context/CartContext"; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); 
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

  const filteredItems = foodItems.filter((item) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter ? item.category === categoryFilter : true)
  );

  // Food categories with images
  const categories = [
    { name: "Veg", image: "https://img.freepik.com/free-vector/locro-illustration-hand-drawn-style_23-2149203360.jpg?t=st=1741782426~exp=1741786026~hmac=242067beed5a1c5157d64a04c478ff2d618a50eeab7c85c5caa559bd9ca72a4a&w=900" },
    { name: "Non-Veg", image: "https://img.freepik.com/premium-vector/vector-paneer-butter-masala-cheese-cottage-curry_466689-23714.jpg?w=1480" },
    { name: "Chinese", image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-vietnamese-food-illustration_23-2149291291.jpg?t=st=1741781880~exp=1741785480~hmac=0e7476400426b0c52d2ef28ce7cb5e07384e3103150dd7bf23c660af830e7f3d&w=900" },
    { name: "Bakery", image: "https://img.freepik.com/free-vector/realistic-bread-composition-with-fresh-loaves-buns-toasts-ears-wheat-vector-illustration_1284-78914.jpg?t=st=1741782017~exp=1741785617~hmac=5f3dac29fb705c18bb14f27e33296f0a3794a80633838c293d205cac01c164b9&w=1380" },
    { name: "Drinks", image: "https://img.freepik.com/free-vector/mojito-concept-illustration_114360-9904.jpg?t=st=1741782206~exp=1741785806~hmac=eacecd90987a9016cc2f7380515c1980cd45fb29dd8f5e91826ec8a220f8f803&w=900" },
    { name: "Pizzas", image: "https://img.freepik.com/free-vector/flat-hot-pizza-icons-isolated-white-pepperoni-vector_90220-2670.jpg?t=st=1741782266~exp=1741785866~hmac=6e6bd727b74cccf1d1628b4783aa81a0d472ef0b8c05579b6b29f23ca7ba7e65&w=900" },
    { name: "Burgers", image: "https://img.freepik.com/free-vector/hand-drawn-burger-illustration_23-2151165801.jpg?t=st=1741782322~exp=1741785922~hmac=7766249acc64562adbbaddf513625b8bc92fc429ccec7bcc09d6dc64ec102863&w=900" },
    { name: "Biryanis", image: "https://img.freepik.com/free-vector/drawn-delicious-chicken-biryani-bowl_23-2148721823.jpg?t=st=1741781820~exp=1741785420~hmac=1eb9c01da1a5c4ba641616bd0f80c71504d21d4ab21ae729dc63ecdbb6fb3582&w=900" },
    { name: "Rotis", image: "https://myfoodstory.com/wp-content/uploads/2020/04/Soft-Rotis-How-to-make-them-at-home-4.jpg" }
  ];

  return (
    <Box sx={{ textAlign: "center", minHeight: "100vh", backgroundColor: "#F5F5DC", pt:"85px" }}>
      
      {/* Hero Section with Swiper */}
      <Box sx={styles.heroSection}>
        <Typography variant="h3" sx={styles.heroTitle}>
          Explore Our Delicious Categories
        </Typography>
        <Swiper
  modules={[Pagination, Autoplay]}
  spaceBetween={15}
  slidesPerView={3} // Adjust for responsiveness
  loop={true}
  autoplay={{ delay: 2500 }}
  pagination={{ clickable: true }}
  style={{ padding: "10px", width: "90%", margin: "auto" }}
>
  {categories.map((category) => (
    <SwiperSlide key={category.name}>
      <Card
        sx={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia component="img" height="180" image={category.image} alt={category.name} />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {category.name}
          </Typography>
        </Box>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>

      </Box>

      {/* Search & Filter Section */}
      <Box sx={styles.filterContainer}>
        <TextField
          variant="outlined"
          placeholder="Search food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={styles.searchBar}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          displayEmpty
          sx={styles.filterDropdown}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.name} value={category.name.toLowerCase()}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Menu Items Grid */}
      <Box sx={styles.menuContainer}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} sx={styles.menuCard}>
              <CardMedia
                component="img"
                height="150"
                image={item.imageUrl || "https://via.placeholder.com/150"}
                alt={item.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <Typography variant="h6" sx={styles.itemTitle}>{item.name}</Typography>
              <Typography variant="body1" sx={styles.itemPrice}>₹{item.price}</Typography>
              <Button
                sx={styles.addButton}
                onClick={() => addToCart(item)}
                disabled={cart.some(cartItem => cartItem.id === item.id)}
              >
                {cart.some(cartItem => cartItem.id === item.id) ? "Added" : "Add to Cart"}
              </Button>
            </Card>
          ))
        ) : (
          <Typography>No food items available</Typography>
        )}
      </Box>
    </Box>
  );
}

// ✅ Improved Styles
const styles = {
  heroSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "linear-gradient(to bottom, #e07b39, #f5f5dc)", // Gradient background
    width: "99vw",
  },
  heroTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  categoryCard: {
    width: 270,
    cursor: "pointer",
    position: "relative",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": { transform: "scale(1.08)" },
  },
  cardImage: {
    borderRadius: "10px",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "40%",
    background: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
  },
  searchBar: {
    width: "300px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  filterDropdown: {
    width: "200px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
  },
  menuCard: {
    width: 250,
    backgroundColor: "#DCE4C9",
    boxShadow: 3,
    borderRadius: "10px",
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#B6A28E",
  },
  itemPrice: {
    color: "#E07B39",
  },
  addButton: {
    backgroundColor: "#E07B39",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "8px",
    width: "100%",
    marginTop: "10px",
    "&:hover": { backgroundColor: "#B6A28E" },
  },
};

export default Menu;
