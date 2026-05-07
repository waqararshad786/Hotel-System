import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLightbulb, FaWallet, FaShieldAlt, FaMap, FaUtensils, 
  FaPhone, FaLanguage, FaTshirt, FaCheckCircle, FaEnvelope, 
  FaPhone as FaPhoneIcon, FaMapMarkerAlt, FaPlane, FaHotel,
  FaUmbrella, FaPassport, FaMoneyBillWave, FaChargingStation
} from 'react-icons/fa';

const TravelTips = () => {
  const tips = [
    {
      icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
      title: 'Plan Ahead',
      description: 'Research your destination, book accommodations in advance, and create a rough itinerary.',
      tips: ['Check visa requirements', 'Book flights early', 'Make hotel reservations'],
      color: 'bg-yellow-50'
    },
    {
      icon: <FaWallet className="text-green-600 text-3xl" />,
      title: 'Budget Wisely',
      description: 'Create a realistic budget including accommodation, food, transport, and activities.',
      tips: ['Use local transport', 'Eat where locals eat', 'Look for free attractions'],
      color: 'bg-green-50'
    },
    {
      icon: <FaShieldAlt className="text-blue-600 text-3xl" />,
      title: 'Stay Safe',
      description: 'Keep your belongings secure and be aware of your surroundings.',
      tips: ['Use hotel safes', 'Keep copies of documents', 'Share your itinerary'],
      color: 'bg-blue-50'
    },
    {
      icon: <FaMap className="text-red-500 text-3xl" />,
      title: 'Navigation',
      description: 'Download offline maps and learn basic directions in the local language.',
      tips: ['Use Google Maps offline', 'Download local transit apps', 'Know emergency numbers'],
      color: 'bg-red-50'
    },
    {
      icon: <FaUtensils className="text-orange-500 text-3xl" />,
      title: 'Food & Water',
      description: 'Try local cuisine but be mindful of food safety.',
      tips: ['Drink bottled water', 'Try street food from busy stalls', 'Inform about allergies'],
      color: 'bg-orange-50'
    },
    {
      icon: <FaPhone className="text-purple-600 text-3xl" />,
      title: 'Stay Connected',
      description: 'Get a local SIM card or international roaming plan.',
      tips: ['Portable WiFi', 'Download offline apps', 'Keep power bank'],
      color: 'bg-purple-50'
    },
    {
      icon: <FaLanguage className="text-indigo-600 text-3xl" />,
      title: 'Learn Basic Phrases',
      description: 'Knowing a few words in the local language goes a long way.',
      tips: ['Hello, Thank you, Please', 'Where is?', 'How much?'],
      color: 'bg-indigo-50'
    },
    {
      icon: <FaTshirt className="text-teal-600 text-3xl" />,
      title: 'Pack Smart',
      description: 'Pack according to weather and cultural norms.',
      tips: ['Layer clothing', 'Comfortable shoes', 'First aid kit'],
      color: 'bg-teal-50'
    }
  ];

  const checklist = [
    { icon: <FaPassport />, title: 'Documents', items: ['Passport / ID Card', 'Visa (if required)', 'Travel Insurance', 'Hotel Bookings', 'Flight Tickets'] },
    { icon: <FaMoneyBillWave />, title: 'Money & Cards', items: ['Local Currency', 'Credit/Debit Cards', 'Emergency Cash', 'Travel Card'] },
    { icon: <FaChargingStation />, title: 'Electronics', items: ['Phone & Charger', 'Power Bank', 'Universal Adapter', 'Camera'] },
    { icon: <FaUmbrella />, title: 'Essentials', items: ['First Aid Kit', 'Medications', 'Sunscreen', 'Umbrella'] }
  ];

  const emergencyContacts = [
    { name: 'Police', number: '15', icon: '🚓', color: 'bg-red-100' },
    { name: 'Ambulance', number: '115', icon: '🚑', color: 'bg-green-100' },
    { name: 'Fire Brigade', number: '16', icon: '🔥', color: 'bg-orange-100' },
    { name: 'Tourist Helpline', number: '1422', icon: '🆘', color: 'bg-blue-100' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 rounded-full p-3 mb-3">
            <FaLightbulb className="text-blue-900 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Travel <span className="text-blue-900">Tips & Guides</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Essential advice to make your journey smooth, safe, and memorable
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {tips.map((tip, index) => (
            <div key={index} className={`${tip.color} rounded-lg p-4 hover:shadow-lg transition-all duration-300 group`}>
              <div className="text-center mb-3">
                <div className="inline-block bg-white p-2 rounded-full shadow-md group-hover:scale-110 transition">
                  {tip.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm text-center mb-3">{tip.description}</p>
              <ul className="space-y-1">
                {tip.tips.map((item, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                    <FaCheckCircle className="text-green-500 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Travel Checklist */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Essential Travel Checklist</h2>
            <p className="text-gray-500 text-sm">Don't forget these important items</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {checklist.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-blue-600 text-xl">{section.icon}</div>
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                </div>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-1">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Emergency Contacts in Pakistan</h2>
            <p className="text-gray-500 text-sm">Save these numbers for emergencies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className={`${contact.color} rounded-lg p-4 text-center hover:shadow-md transition`}>
                <div className="text-3xl mb-2">{contact.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{contact.name}</p>
                <p className="text-xl font-bold text-red-600">{contact.number}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Tips */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-5 mb-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <FaPlane className="text-3xl text-yellow-400" />
            <h2 className="text-xl font-bold">Pro Travel Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Book flights on Tuesday for best deals</p>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Pack a reusable water bottle</p>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Learn basic local phrases</p>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Take photos of your luggage</p>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Use incognito mode for flight searches</p>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-400 mt-0.5" />
              <p className="text-sm text-blue-100">Notify your bank before traveling</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Need More Help?</h2>
            <p className="text-gray-500 text-sm">Our travel experts are here for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaEnvelope className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <p className="text-sm font-semibold">travel@luxestay.com</p>
              </div>
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaPhoneIcon className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <p className="text-sm font-semibold">+92 300 1234567</p>
              </div>
            </Link>
            <Link to="/contact" className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg hover:shadow-md transition">
              <FaHotel className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Visit Us</p>
                <p className="text-sm font-semibold">Lahore, Pakistan</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            ← Back to Home
          </Link>
          <Link to="/hotels" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
            Browse Hotels
          </Link>
          <Link to="/destinations" className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelTips;