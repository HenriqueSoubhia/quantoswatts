import useMenageStorage from "@/hooks/useMenageStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { getUser } = useMenageStorage();

  if (!getUser()) {
    return <Navigate to="/cadastrar" />;
  }

  return <Outlet />

};

export default ProtectedRoutes;
