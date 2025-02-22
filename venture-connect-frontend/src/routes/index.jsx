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
import InvestorNetwork from '../pages/InvestorNetwork';
import StartupOpportunities from '../pages/StartupOpportunities';
import BookmarkedStartups from '../pages/BookMarks';
import InvestorProfile from '../pages/InvesterProfile';
import AddOpportunity from '../pages/AddOpportunity';
import JoinEvent from '../pages/JoinEvent';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="joinevent" element={<JoinEvent />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          <Route path="/startups-hub" element={<StartupsHub />} />
          <Route path="/investor-network" element={<InvestorNetwork />} />
          <Route
            path="/startup-opportunities"
            element={<StartupOpportunities />}
          />
          <Route path="/bookmarks" element={<BookmarkedStartups />} />
          <Route
            path="/Add-Oppertunity-Investor"
            element={<AddOpportunity />}
          />
          <Route path="/investor-profile" element={<InvestorProfile />} />
        </Route>
      </Route>
    </Route>,
  ),
);

const AppRouters = () => {
  return <RouterProvider router={router} />;
};

export default AppRouters;
