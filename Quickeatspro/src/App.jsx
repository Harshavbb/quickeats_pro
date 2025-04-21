import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import MyOrders from "./pages/MyOrders"; // Import MyOrders page
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protect these routes */}
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
