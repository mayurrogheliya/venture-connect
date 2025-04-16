import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.user_type == 'admin') {
    if (!allowedRoles.includes(user?.user_type)) {
      return <Navigate to="/admin" replace />;
    }
  } else {
    if (!allowedRoles.includes(user?.data?.user_type)) {
      return <Navigate to="/startups-hub" replace />;
    }
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
