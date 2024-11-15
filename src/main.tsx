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
import DashboardHome from "./pages/Dashboard/pages/Home";
import Settings from "./pages/Dashboard/pages/Settings";
import Report from "./pages/Dashboard/pages/Report";
import Registration from "./pages/Dashboard/pages/Registration/Registration";
import Devices from "./pages/Dashboard/pages/Devices/Devices";
import Alerts from "./pages/Dashboard/pages/Alerts";

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
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome />,
          },
          {
            path: "/dashboard/alertas",
            element: <Alerts />,
          },
          {
            path: "/dashboard/configuracoes",
            element: <Settings />,
          },
          {
            path: "/dashboard/relatorios",
            element: <Report />,
          },
          {
            path: "/dashboard/registro",
            element: <Registration />,
          },
          {
            path: "/dashboard/dispositivos",
            element: <Devices />,
          },

        ]
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
