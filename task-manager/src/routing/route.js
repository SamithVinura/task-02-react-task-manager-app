import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { ErrorPage } from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
export const router = createBrowserRouter([
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);
