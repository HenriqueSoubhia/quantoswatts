import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const { getData } = useLocalStorage("user");

  const [user] = useState(getData());

  return user ? <Outlet /> : <Navigate to="/entrar" replace />;
};

export default ProtectedRoutes;
