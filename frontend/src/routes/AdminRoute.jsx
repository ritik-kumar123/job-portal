// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "employer") {
    return <Navigate to="/employer" replace />;
  }

  if (user?.role === "student") {
    return <Navigate to="/" replace />;
  }

  if (user?.role === "admin") {
    return children;
  }

  // Default fallback
  return <Navigate to="/login" replace />;
};

export default AdminRoute;
