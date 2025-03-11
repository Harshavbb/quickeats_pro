import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { role } = useAuth();
    if (role === "admin") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };
export default AdminRoute;
