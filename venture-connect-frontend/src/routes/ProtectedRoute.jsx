import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  let isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  let isProfileCompleted = false;
  if (isProfileCompleted) {
    return <Navigate to="/complete-startup-profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
