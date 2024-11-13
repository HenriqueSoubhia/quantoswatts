import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/cadastrar",
        element: <Singup />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
