// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage';
import VendorRegistration from './pages/VendorRegistration';
import EventForm from './pages/EventForm';
import NotFound from './pages/NotFound';
import OtpPage from './pages/Otpverification.jsx';
import ListingPage from './pages/ListingPage';
import VendorDetails from './pages/VendorDetails';
import ChatPage from './pages/ChatPage';
import VendorFlow from './pages/VendorFlow';
import CorporateBooking from './pages/CorporateBooking';
import CorporateSignup from "./pages/CorporateSignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";

const router = createBrowserRouter([
  { path: '/', element: <LandingPage />},
  { path: '/VendorRegistration', element: <VendorRegistration /> },
  { path: '/chat', element: <ChatPage /> },
  { path: '/VendorDetails', element: <VendorDetails /> },
  { path: '/listings', element: <ListingPage /> },
  { path: '/corporate-signup', element: <CorporateSignup /> },
  { path: '/login', element: <AuthPage /> },
  { path: '/signup', element: <AuthPage /> },
  { path: '/CorporateBooking', element: <CorporateBooking /> },
  { path: '/AdminDashboard', element: <AdminDashboard /> },
  { path: '/UserDashboard', element: <UserDashboard /> },
  { path: '/VendorDashboard', element: <VendorDashboard /> },
  {
    path: '/vendor',
    children: [
      { path: 'register', element: <VendorFlow /> },
    ],
  },
  {
    path: '/plan-event',
    children: [
      { path: 'form', element: <EventForm /> },
    ],
  },
  { path: '/otp', element: <OtpPage /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
