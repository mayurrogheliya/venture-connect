import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user?.data?.user_type)) {
    if (user?.data?.user_type === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.data?.user_type === 'startup') {
      return <Navigate to="/startups-hub" replace />;
    } else if (user?.data?.user_type === 'investor') {
      return <Navigate to="/startups-hub" replace />;
    }
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
