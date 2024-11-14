import useMenageStorage from "@/hooks/useMenageStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { getUser } = useMenageStorage();

  // console.log(getUser())

  return <Outlet />

};

export default ProtectedRoutes;
