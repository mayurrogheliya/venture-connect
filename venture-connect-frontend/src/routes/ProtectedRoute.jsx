import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const ProtectedRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
