import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if there's a logged-in user in session storage
  const loggedInUser = localStorage.getItem("loggedInUser");

  // If there's no logged-in user, redirect to the login page
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child components
  return children;
};

export default ProtectedRoute;
