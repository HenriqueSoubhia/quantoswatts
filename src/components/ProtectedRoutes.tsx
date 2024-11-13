import useLocalStorage from "@/hooks/useLocalStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const [user] = useLocalStorage("user", {});

  return user ? <Outlet /> : <Navigate to="/entrar" replace />;
};

export default ProtectedRoutes;
