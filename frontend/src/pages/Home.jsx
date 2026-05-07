import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUsers, FaShieldAlt, FaCheckCircle, FaCreditCard, FaClock, FaPhone, FaEnvelope, FaStar, FaArrowRight } from 'react-icons/fa';
import { getHotels, getCities } from '../services/hotelService';
import HotelCard from '../components/hotels/HotelCard';
import Loader from '../components/common/Loader';
import RecentlyViewed from '../components/common/RecentlyViewed';
import RecentBookings from '../components/common/RecentBookings';

const Home = () => {
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!checkIn) setCheckIn(today);
    if (!checkOut) setCheckOut(tomorrowStr);
  }, []);

  const fetchData = async () => {
    try {
      const [hotelsRes, citiesRes] = await Promise.all([
        getHotels({ limit: 6 }),
        getCities()
      ]);
      setFeaturedHotels(hotelsRes.data.hotels || []);
      setCities(citiesRes.data.cities || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let url = '/hotels?';
    if (searchCity) url += `city=${searchCity}&`;
    if (checkIn) url += `checkIn=${checkIn}&`;
    if (checkOut) url += `checkOut=${checkOut}&`;
    if (guests) url += `guests=${guests}`;
    window.location.href = url;
  };

  if (loading) return <Loader />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-cover bg-center flex items-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945")'
      }}>
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center text-white animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Welcome to <span className="gradient-text">LuxeStay</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover luxury stays and unforgettable experiences across Pakistan
            </p>
            
            <div className="glass p-6 md:p-8 rounded-2xl">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-white text-sm mb-2">📍 Destination</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">📅 Check In</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                  />
                  <p className="text-xs text-white/70 mt-1">From 2:00 PM</p>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">📅 Check Out</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || today}
                  />
                  <p className="text-xs text-white/70 mt-1">Until 12:00 PM</p>
                </div>
                
                <div>
                  <label className="block text-white text-sm mb-2">👥 Guests</label>
                  <input 
                    type="number" 
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
                
                <button type="submit" className="md:col-span-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg hover:from-orange-500 hover:to-orange-600 transition font-semibold text-lg btn-pulse">
                  <FaSearch className="inline mr-2" /> Search Hotels
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <FaShieldAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Best Price</p>
                <p className="text-xs text-gray-500">Guarantee</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaCheckCircle className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Free</p>
                <p className="text-xs text-gray-500">Cancellation</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaCreditCard className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Secure</p>
                <p className="text-xs text-gray-500">Payments</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <FaClock className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">24/7</p>
                <p className="text-xs text-gray-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Hotels */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured Hotels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular luxury stays across Pakistan</p>
        </div>
        
        {featuredHotels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found. Please add hotels from admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map(hotel => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/hotels" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-3 rounded-lg hover:from-blue-800 hover:to-blue-700 transition font-semibold">
            View All Hotels <FaArrowRight />
          </Link>
        </div>
      </div>
      
      {/* Recently Viewed */}
      <RecentlyViewed />
      
      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose LuxeStay?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide the best travel experience with unbeatable benefits</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="feature-icon mx-auto">
                <span className="text-3xl">🏨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Hotels</h3>
              <p className="text-gray-600">Curated selection of top-rated hotels across Pakistan</p>
            </div>
            <div className="text-center group">
              <div className="feature-icon mx-auto">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive rates and exclusive deals</p>
            </div>
            <div className="text-center group">
              <div className="feature-icon mx-auto">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaPhone className="text-3xl mb-2 text-orange-400" />
              <h4 className="font-semibold mb-1">24/7 Customer Support</h4>
              <p className="text-blue-200">+92 300 1234567</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-3xl mb-2 text-orange-400" />
              <h4 className="font-semibold mb-1">Email Us</h4>
              <p className="text-blue-200">support@luxestay.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaClock className="text-3xl mb-2 text-orange-400" />
              <h4 className="font-semibold mb-1">Working Hours</h4>
              <p className="text-blue-200">Mon-Sun: 24/7</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Luxurious Stay?</h2>
          <p className="text-xl mb-8">Book your dream hotel today and experience comfort like never before</p>
          <Link to="/hotels" className="bg-orange-400 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-500 transition inline-block">
            Explore Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;