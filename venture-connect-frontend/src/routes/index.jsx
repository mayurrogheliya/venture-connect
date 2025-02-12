import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Landing from '../pages/Landing';
import MainLayout from '../Layouts/MainLayout';
import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';
import UserLayout from '../Layouts/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import StartupsHub from '../pages/StartupsHub';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/startups-hub" element={<StartupsHub />} />
        </Route>
      </Route>
    </Route>,
  ),
);

const AppRouters = () => {
  return <RouterProvider router={router} />;
};

export default AppRouters;
