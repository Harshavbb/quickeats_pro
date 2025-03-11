import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import Auth Context

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user

  return currentUser ? children : <Navigate to="/login" />; // Redirect if not logged in
};

export default ProtectedRoute;
