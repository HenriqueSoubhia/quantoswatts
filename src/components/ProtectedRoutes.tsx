import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { getAuthUser } = useAuth()

  if (!getAuthUser()) {
    return <Navigate to='/cadastrar' />
  }

  return <Outlet />
}

export default ProtectedRoutes
