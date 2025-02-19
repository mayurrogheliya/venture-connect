import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  let isAuthenticated = false;
  if (isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
