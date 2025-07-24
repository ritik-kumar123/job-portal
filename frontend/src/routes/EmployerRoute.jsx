import React from 'react'
import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function EmployerRoute({children}) {
  const { user } = useContext(AppContext);

  if (!user || user.role !== "employer") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default EmployerRoute
