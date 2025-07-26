// src/router.jsx
import { createBrowserRouter } from 'react-router-dom';

import LandingPageNew from './pages/LandingPageNew';
import AuthPage from './pages/AuthPage';
import VendorRegistration from './pages/VendorRegistration';
import EventForm from './pages/EventForm';
import NotFound from './pages/NotFound';
import OtpPage from './pages/OtpVerification';
import ListingPage from './pages/ListingPage';
import VendorDetails from './pages/VendorDetails';
import ChatPage from './pages/ChatPage';
import VendorFlow from './pages/VendorFlow';
import VendorDashboard from './pages/VendorDashboard';
import VendorChatList from './pages/VendorChatList';
import VendorChat from './pages/VendorChat';
import CorporateBooking from './pages/CorporateBooking';
import CorporateSignup from "./pages/CorporateSignUp";
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <LandingPageNew />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/VendorRegistration', 
    element: <VendorRegistration />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/chat', 
    element: <ChatPage />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/VendorDetails', 
    element: <VendorDetails />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/vendor/:id', 
    element: <VendorDetails />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/listings', 
    element: <ListingPage />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/corporate-signup', 
    element: <CorporateSignup />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/login', 
    element: <AuthPage />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/signup', 
    element: <AuthPage />,
    errorElement: <ErrorPage />
  },
  { 
    path: '/CorporateBooking', 
    element: <CorporateBooking />,
    errorElement: <ErrorPage />
  },
  {
    path: '/vendor',
    errorElement: <ErrorPage />,
    children: [
      { path: 'register', element: <VendorFlow /> },
      { path: 'dashboard', element: <VendorDashboard /> },
      { path: 'chats', element: <VendorChatList /> },
      { path: 'chat', element: <VendorChat /> },
    ],
  },
  {
    path: '/plan-event',
    errorElement: <ErrorPage />,
    children: [
      { path: 'form', element: <EventForm /> },
    ],
  },
  { 
    path: '/otp', 
    element: <OtpPage />,
    errorElement: <ErrorPage />
  },
  { 
    path: '*', 
    element: <NotFound />,
    errorElement: <ErrorPage />
  },
]);

export default router;
