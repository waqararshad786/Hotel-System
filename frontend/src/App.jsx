import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import UserNavbar from './components/common/Navbar';
import AdminNavbar from './components/admin/AdminNavbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import RoomDetails from './pages/RoomDetails';
import BookingSummary from './pages/BookingSummary';
import BookingSuccess from './pages/BookingSuccess';
import HotelPolicies from './pages/HotelPolicies';
import WishlistPage from './pages/WishlistPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import BookingDetails from './pages/BookingDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Destinations from './pages/Destinations';
import TravelTips from './pages/TravelTips';
import Dashboard from './pages/admin/Dashboard';
import ManageBookings from './pages/admin/ManageBookings';
import ManageHotels from './pages/admin/ManageHotels';
import ManageRooms from './pages/admin/ManageRooms';
import ManageUsers from './pages/admin/ManageUsers';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import ManageContacts from './pages/admin/ManageContacts';

// Component to handle conditional navbar and footer
const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  const isAdmin = user?.role === 'admin';
  
  return (
    <div className="min-h-screen flex flex-col">
      {isAdmin ? <AdminNavbar /> : <UserNavbar />}
      <main className="flex-grow">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/booking-success/:id" element={<BookingSuccess />} />
          <Route path="/hotel-policies" element={<HotelPolicies />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          
          {/* Content Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
          </Route>
          
          {/* Admin Routes - No Footer */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/hotels" element={<ManageHotels />} />
            <Route path="/admin/rooms" element={<ManageRooms />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/contacts" element={<ManageContacts />} /> {/* ✅ Add this */}
          </Route>
        </Routes>
      </main>
      {/* Footer only shows for non-admin routes */}
      {!isAdmin && <Footer />}
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '12px',
        },
      }} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <AppContent />
          </RecentlyViewedProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;