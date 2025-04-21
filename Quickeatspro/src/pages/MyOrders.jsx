import React, { useEffect, useState } from "react";
import { db } from "../firebase/config"; // Make sure your Firebase config is here
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";

function MyOrders() {
  const { currentUser } = useAuth(); // Get logged-in user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const ordersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5, color: "#B6A28E" }}>
        You haven’t placed any orders yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "30px", backgroundColor: "#F5F5DC", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", color: "#E07B39", mb: 4 }}>
        🧾 My Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} key={order.id}>
            <Card sx={{ backgroundColor: "#FFFFFF", boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#B6A28E", fontWeight: "bold" }}>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2" sx={{ color: "#999", mb: 2 }}>
                  Placed on: {new Date(order.createdAt?.seconds * 1000).toLocaleString()}
                </Typography>

                {order.items.map((item, index) => (
                  <Typography key={index} sx={{ color: "#333" }}>
                    {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                  </Typography>
                ))}

                <Typography variant="subtitle1" sx={{ color: "#E07B39", fontWeight: "bold", mt: 2 }}>
                  Total: ₹{order.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MyOrders;
