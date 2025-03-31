import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
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
import StartupOpportunities from '../pages/Opportunity/StartupOpportunities.jsx';
import BookmarkedStartups from '../pages/BookMarks';
import InvestorProfile from '../pages/InvestorProfile';
import StartupProfileForm from '../pages/StartupProfileForm';
import JoinEvent from '../pages/JoinEvent';
import StartupProfile from '../pages/StartupProfile';
import AdminLayout from '../Layouts/AdminLayout';
import InvestorOpportunity from '../pages/Opportunity/InvestorOpportunity.jsx';
import RegStartup from '../pages/RegStartup.jsx';
import UserMain from '../pages/Admin/User/UserMain';
import AdminEvents from '../pages/Admin/Events/AdminEvents.jsx';
import CreateEvent from '../pages/Admin/Events/CreateEvent.jsx';
import EditEvent from '../pages/Admin/Events/EditEvent.jsx';
import InvestorProfileForm from '../components/Forms/Investor/mainForm.jsx';
import EventAttendees from '../pages/Admin/EventAttendees/EventAttendees.jsx';
import AdminOpportunity from '../pages/Admin/AdminOpportunity.jsx';
import EditOpportunity from '../pages/Opportunity/EditOpportunity.jsx';
import CreateOpportunity from '../pages/Opportunity/CreateOpportunity.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="joinevent/:id" element={<JoinEvent />} />
      </Route>

      {/* User Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/complete-startup-profile"
          element={<StartupProfileForm />}
        />
        <Route
          path="/complete-investor-profile"
          element={<InvestorProfileForm />}
        />
        <Route path="/startup-profile/:id" element={<StartupProfile />} />
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
            element={<CreateOpportunity />}
          />
          <Route path="opportunities/edit/:id" element={<EditOpportunity />} />
          <Route
            path="/Investor-Opportunity"
            element={<InvestorOpportunity />}
          />
          <Route path="/investor-profile" element={<InvestorProfile />} />
        </Route>
        <Route path="/Registered-Startups" element={<RegStartup />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UserMain />} />
          <Route path="opportunities" element={<AdminOpportunity />} />

          <Route path="events" element={<AdminEvents />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/edit/:id" element={<EditEvent />} />
          <Route path="events/eventattends/:id" element={<EventAttendees />} />
        </Route>
      </Route>
    </Route>,
  ),
);

const AppRouters = () => {
  return <RouterProvider router={router} />;
};

export default AppRouters;
