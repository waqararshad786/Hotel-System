import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import { getRoomsByHotel } from '../services/roomService';
import Loader from '../components/common/Loader';
import ShareButtons from '../components/common/ShareButtons';
import PriceAlert from '../components/common/PriceAlert';
import ReviewSection from '../components/common/ReviewSection';
import NearbyAttractions from '../components/common/NearbyAttractions';
import CheckInOut from '../components/common/CheckInOut';
import HotelFacilities from '../components/common/HotelFacilities';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { 
  FaStar, FaMapMarkerAlt, FaWifi, FaSwimmer, FaUtensils, FaDumbbell, 
  FaImage, FaChevronLeft, FaChevronRight, FaPhone, FaEnvelope, 
  FaCheckCircle, FaShieldAlt, FaCreditCard, FaClock, FaInfoCircle,
  FaUsers, FaBed, FaTv, FaSnowflake, FaCoffee
} from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import toast from 'react-hot-toast';
import { createBooking } from '../services/bookingService';

// Image URL helper
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const { addToRecentlyViewed } = useRecentlyViewed();
  const hasAddedRef = useRef(false);

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  useEffect(() => {
    if (hotel && !hasAddedRef.current) {
      hasAddedRef.current = true;
      addToRecentlyViewed(hotel);
    }
  }, [hotel, addToRecentlyViewed]);

  const fetchHotelDetails = async () => {
    setLoading(true);
    try {
      const [hotelRes, roomsRes] = await Promise.all([
        getHotelById(id),
        getRoomsByHotel(id)
      ]);
      setHotel(hotelRes.data.hotel);
      setRooms(roomsRes.data.rooms || []);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
    if (!checkIn) setCheckIn(today);
    if (!checkOut) setCheckOut(tomorrowStr);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * (selectedRoom?.pricePerNight || 0);
  const taxes = totalPrice * 0.16;
  const grandTotal = totalPrice + taxes;

  // ✅ Updated - Redirect to home page after booking
  const handleBookingSubmit = async () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    if (!guestName || !guestPhone || !guestEmail) {
      toast.error('Please fill all guest details');
      return;
    }

    setIsBooking(true);
    try {
      const response = await createBooking({
        hotelId: hotel._id,
        roomId: selectedRoom._id,
        checkIn,
        checkOut,
        guestName,
        guestPhone,
        guestEmail,
        specialRequests: ''
      });
      
      if (response.data.success) {
        toast.success('Booking confirmed successfully!');
        // ✅ Redirect to home page
        navigate('/');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  const amenityIcons = {
    'WiFi': <FaWifi />,
    'Swimming Pool': <FaSwimmer />,
    'Restaurant': <FaUtensils />,
    'Gym': <FaDumbbell />
  };

  const hotelImages = hotel?.images?.length > 0 
    ? hotel.images.map(img => ({ src: getImageUrl(img) || fallbackImage }))
    : [{ src: fallbackImage }];

  if (loading) return <Loader />;
  if (!hotel) return <div className="text-center py-12">Hotel not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold">{hotel.emoji} {hotel.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-500 mr-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < hotel.stars ? 'text-yellow-500' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-gray-600">{hotel.rating || 4.5} rating</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate(-1)} className="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition">
              ← Back
            </button>
            <Link to="/hotel-policies" className="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition">
              Hotel Policies
            </Link>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{hotel.address}, {hotel.city}</span>
        </div>
        
        <div className="flex gap-4 mb-6">
          <ShareButtons hotelName={hotel.name} hotelId={hotel._id} />
          <PriceAlert hotelId={hotel._id} hotelName={hotel.name} currentPrice={hotel.pricePerNight || 10000} />
        </div>
        
        <p className="text-gray-700 mb-6">{hotel.description}</p>
        
        {/* Image Gallery */}
        <div className="mb-6">
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={hotelImages[currentImageIndex]?.src}
              alt={hotel.name}
              className="w-full h-96 object-cover cursor-pointer"
              onClick={() => {
                setPhotoIndex(currentImageIndex);
                setLightboxOpen(true);
              }}
              onError={(e) => { e.target.src = fallbackImage; }}
            />
            
            {hotelImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % hotelImages.length)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                >
                  <FaChevronRight />
                </button>
                <button
                  onClick={() => {
                    setPhotoIndex(currentImageIndex);
                    setLightboxOpen(true);
                  }}
                  className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  <FaImage /> View All
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {hotelImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition ${
                        idx === currentImageIndex ? 'bg-white w-4' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {hotelImages.length > 1 && (
            <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
              {hotelImages.slice(0, 6).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setPhotoIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentImageIndex ? 'border-blue-900' : 'border-transparent'
                  }`}
                >
                  <img src={img.src} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Amenities */}
        <div className="flex flex-wrap gap-3 mb-6">
          <h3 className="w-full font-semibold mb-2">Amenities:</h3>
          {hotel.amenities?.map((amenity, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
              {amenityIcons[amenity] || '✓'} {amenity}
            </span>
          ))}
        </div>
      </div>
      
      {/* Rooms Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
        {rooms.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No rooms available at the moment</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rooms.map(room => (
              <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer" onClick={() => handleRoomSelect(room)}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={getImageUrl(room.images?.[0]) || fallbackImage}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImage; }}
                    />
                  </div>
                  <div className="p-5 md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{room.name}</h3>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-900">PKR {room.pricePerNight?.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">per night</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <FaUsers /> {room.capacity} Guests
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <FaBed /> {room.type}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <FaWifi /> WiFi
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                        <FaSnowflake /> AC
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoomSelect(room);
                      }}
                      className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                      Select Room →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Book {selectedRoom.name}</h2>
              <button onClick={() => setShowBookingForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Image */}
              <div>
                <img 
                  src={getImageUrl(selectedRoom.images?.[0]) || fallbackImage}
                  alt={selectedRoom.name}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
                <div className="mt-3">
                  <h3 className="font-semibold">{selectedRoom.name}</h3>
                  <p className="text-gray-600 text-sm">{selectedRoom.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <FaUsers /> {selectedRoom.capacity} Guests
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <FaBed /> {selectedRoom.type}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <FaTv /> TV
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <FaCoffee /> Mini Bar
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">From 2:00 PM</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || today}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">Until 12:00 PM</p>
                </div>

                {nights > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-semibold">Stay Summary</p>
                    <p className="text-sm">{nights} night(s) × PKR {selectedRoom.pricePerNight?.toLocaleString()}</p>
                    <p className="text-sm">Taxes (16%): PKR {Math.round(taxes).toLocaleString()}</p>
                    <p className="text-lg font-bold text-blue-900 mt-1">Total: PKR {Math.round(grandTotal).toLocaleString()}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="03XXXXXXXXX"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                
                <button
                  onClick={handleBookingSubmit}
                  disabled={isBooking}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition"
                >
                  {isBooking ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:shadow-md transition">
          <FaShieldAlt className="text-green-600 text-3xl mx-auto mb-2" />
          <h4 className="font-semibold text-green-800">Best Price Guarantee</h4>
          <p className="text-sm text-green-600">Find a lower price? We'll match it!</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:shadow-md transition">
          <FaCheckCircle className="text-blue-600 text-3xl mx-auto mb-2" />
          <h4 className="font-semibold text-blue-800">Free Cancellation</h4>
          <p className="text-sm text-blue-600">Up to 24 hours before check-in</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition">
          <FaCreditCard className="text-purple-600 text-3xl mx-auto mb-2" />
          <h4 className="font-semibold text-purple-800">Secure Booking</h4>
          <p className="text-sm text-purple-600">Your data is safe with us</p>
        </div>
      </div>
      
      {/* Contact Info */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-900" /> Contact Hotel
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaPhone className="text-blue-900" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Call Hotel</p>
              <p className="font-medium">+92 300 1234567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaEnvelope className="text-blue-900" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Hotel</p>
              <p className="font-medium">info@luxestay.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaClock className="text-blue-900" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-in/out</p>
              <p className="font-medium">2:00 PM / 12:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      <ReviewSection hotelId={hotel._id} reviews={hotel.reviews || []} />
      
      {/* Nearby Attractions */}
      <NearbyAttractions city={hotel.city} />
      
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={hotelImages}
        index={photoIndex}
      />
    </div>
  );
};

export default HotelDetails;