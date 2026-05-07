import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaClock, FaStar, FaPlane, FaHotel, 
  FaUtensils, FaLandmark, FaTree, FaShoppingBag,
  FaCheckCircle, FaEnvelope, FaPhone, FaMap, FaHeart,
  FaCalendarAlt, FaUsers, FaCamera, FaBed, FaWifi
} from 'react-icons/fa';

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Lahore',
      nickname: 'The Heart of Pakistan',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
      description: 'Cultural heart with rich history, delicious food, and vibrant festivals.',
      bestTime: 'Oct - Mar',
      topAttractions: ['Badshahi Mosque', 'Lahore Fort', 'Food Street'],
      hotels: 25,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Karachi',
      nickname: 'City of Lights',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
      description: 'Beautiful beaches, modern malls, and diverse cuisine.',
      bestTime: 'Nov - Feb',
      topAttractions: ['Clifton Beach', 'Port Grand', 'Mohatta Palace'],
      hotels: 30,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Islamabad',
      nickname: 'The Beautiful Capital',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
      description: 'Green, peaceful, surrounded by hills with stunning architecture.',
      bestTime: 'Mar - May',
      topAttractions: ['Faisal Mosque', 'Daman-e-Koh', 'Lake View Park'],
      hotels: 28,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Hunza Valley',
      nickname: 'Heaven on Earth',
      image: 'https://images.unsplash.com/photo-1598977127912-c847f0c1960a?w=400',
      description: 'Breathtaking mountain views, crystal clear rivers.',
      bestTime: 'Apr - Oct',
      topAttractions: ['Attabad Lake', 'Rakaposhi', 'Baltit Fort'],
      hotels: 15,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Skardu',
      nickname: 'Gateway to K2',
      image: 'https://images.unsplash.com/photo-1620825933935-c569c5aae5d2?w=400',
      description: 'Gateway to world\'s highest peaks including K2.',
      bestTime: 'Jun - Sep',
      topAttractions: ['Shangrila Resort', 'Satpara Lake', 'K2 Base Camp'],
      hotels: 12,
      rating: 4.7,
    },
    {
      id: 6,
      name: 'Peshawar',
      nickname: 'City of Flowers',
      image: 'https://images.unsplash.com/photo-1577666293945-8296b15d6006?w=400',
      description: 'Ancient city with rich Pashtun culture and hospitality.',
      bestTime: 'Oct - Mar',
      topAttractions: ['Peshawar Museum', 'Qissa Khwani Bazaar', 'Mahabat Khan Mosque'],
      hotels: 18,
      rating: 4.5,
    },
    {
      id: 7,
      name: 'Multan',
      nickname: 'City of Saints',
      image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=400',
      description: 'Known for shrines, blue pottery, and delicious mangoes.',
      bestTime: 'Oct - Mar',
      topAttractions: ['Multan Fort', 'Shrine of Bahauddin', 'Clock Tower'],
      hotels: 14,
      rating: 4.4,
    },
    {
      id: 8,
      name: 'Swat Valley',
      nickname: 'Switzerland of East',
      image: 'https://images.unsplash.com/photo-1620825933935-c569c5aae5d2?w=400',
      description: 'Lush green meadows, rivers, and snow-capped peaks.',
      bestTime: 'Apr - Oct',
      topAttractions: ['Malam Jabba', 'Mahodand Lake', 'Kalam Valley'],
      hotels: 20,
      rating: 4.8,
    },
    {
      id: 9,
      name: 'Murree',
      nickname: 'Queen of Hills',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      description: 'Beautiful hill station with pine forests and colonial architecture.',
      bestTime: 'May - Sep',
      topAttractions: ['Mall Road', 'Pindi Point', 'Kashmir Point'],
      hotels: 22,
      rating: 4.5,
    },
    {
      id: 10,
      name: 'Fairy Meadows',
      nickname: 'Paradise on Earth',
      image: 'https://images.unsplash.com/photo-1598977127912-c847f0c1960a?w=400',
      description: 'Breathtaking meadows with view of Nanga Parbat.',
      bestTime: 'Jun - Aug',
      topAttractions: ['Nanga Parbat Base Camp', 'Bewal Forest', 'Miranjani'],
      hotels: 8,
      rating: 4.9,
    },
    {
      id: 11,
      name: 'Quetta',
      nickname: 'Fruit Garden',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
      description: 'Known for apples, cherries, and beautiful landscapes.',
      bestTime: 'Apr - Oct',
      topAttractions: ['Hanna Lake', 'Quetta Museum', 'Hazarganji Chiltan'],
      hotels: 16,
      rating: 4.3,
    },
    {
      id: 12,
      name: 'Gwadar',
      nickname: 'Emerging Paradise',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
      description: 'Beautiful deep-sea port with pristine beaches.',
      bestTime: 'Oct - Feb',
      topAttractions: ['Hammer Head', 'Princess of Hope', 'Gwadar Beach'],
      hotels: 12,
      rating: 4.4,
    }
  ];

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500 text-xs" />
        ))}
        {hasHalfStar && <FaStar className="text-yellow-500 text-xs opacity-50" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaStar key={i} className="text-gray-300 text-xs" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-3">
            <FaMap className="text-blue-900 text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Popular <span className="text-blue-900">Destinations</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Explore the most beautiful cities and regions in Pakistan
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
                  }}
                />
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-white px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                  <FaStar className="text-yellow-500 text-xs" />
                  <span className="text-xs font-semibold">{dest.rating}</span>
                </div>
                {/* Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                  <h3 className="text-white font-bold text-sm">{dest.name}</h3>
                  <p className="text-white text-xs opacity-80">{dest.nickname}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{dest.description}</p>
                
                {/* Quick Info */}
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <FaClock size={8} /> {dest.bestTime}
                  </span>
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <FaHotel size={8} /> {dest.hotels}
                  </span>
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                    {getRatingStars(dest.rating)}
                  </span>
                </div>

                {/* Attractions */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {dest.topAttractions.slice(0, 2).map((att, i) => (
                    <span key={i} className="text-xs text-gray-500">📍 {att}</span>
                  ))}
                </div>

                {/* Button */}
                <Link 
                  to={`/hotels?city=${dest.name}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-1.5 rounded text-xs font-medium transition block"
                >
                  View Hotels
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-3 text-center shadow">
            <div className="text-xl mb-0.5">🏔️</div>
            <p className="text-lg font-bold text-blue-900">12+</p>
            <p className="text-xs text-gray-500">Destinations</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow">
            <div className="text-xl mb-0.5">🏨</div>
            <p className="text-lg font-bold text-blue-900">200+</p>
            <p className="text-xs text-gray-500">Hotels</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow">
            <div className="text-xl mb-0.5">⭐</div>
            <p className="text-lg font-bold text-blue-900">4.6</p>
            <p className="text-xs text-gray-500">Avg Rating</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow">
            <div className="text-xl mb-0.5">👥</div>
            <p className="text-lg font-bold text-blue-900">50k+</p>
            <p className="text-xs text-gray-500">Travelers</p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <FaPlane className="text-yellow-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Travel Inspiration</h3>
                <p className="text-blue-100 text-xs">Get destination updates & deals</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-1.5 rounded-lg text-sm w-full md:w-48 focus:outline-none"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-blue-600">Home</Link>
          <Link to="/hotels" className="text-xs text-gray-500 hover:text-blue-600">Hotels</Link>
          <Link to="/travel-tips" className="text-xs text-gray-500 hover:text-blue-600">Travel Tips</Link>
          <Link to="/contact" className="text-xs text-gray-500 hover:text-blue-600">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;