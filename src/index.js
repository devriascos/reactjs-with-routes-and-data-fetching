import React from "react";
import ReactDOM from "react-dom/client";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register'
import Me from './pages/Me'
import PageNotFound from "./pages/PageNotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/me",
    element: <Me />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


