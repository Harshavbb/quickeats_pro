import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Import Firebase config
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'; // Import Firestore methods
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button, // Import MUI Button
} from '@mui/material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders'); // Reference to the 'orders' collection
        const orderSnapshot = await getDocs(ordersCollection); // Get all documents in the collection
        const orderList = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList); // Set the orders in the state
        setLoading(false); // Set loading to false after fetching data
      } catch (err) {
        setError(err.message); // If there's an error, update error state
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId); // Reference to the specific order
      await updateDoc(orderRef, {
        status: 'completed', // Update the status to "completed"
      });
      // Optionally, you can also update the local state to reflect changes immediately
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'completed' } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        All Orders
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="orders table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Food Items</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Actions</TableCell> {/* Column for the "Completed" button */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>
  {order.items && Array.isArray(order.items) && order.items.length > 0
    ? order.items.map(item => item.name).join(', ')  // Extract and join the names of food items
    : 'No items'}  {/* Fallback for missing or empty items */}
</TableCell>

              <TableCell>{order.status}</TableCell>
              <TableCell>
                {new Date(order.createdAt.seconds * 1000).toLocaleString()} {/* Formatting the timestamp */}
              </TableCell>
              <TableCell>
                {order.status === 'pending' && (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleMarkAsCompleted(order.id)} // Mark order as completed
                  >
                    Completed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminOrders;
