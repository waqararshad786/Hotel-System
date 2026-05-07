import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaCity, FaDollarSign, FaWifi, FaSwimmer, FaUtensils, FaDumbbell, FaSort, FaTimes } from 'react-icons/fa';

const SearchFilters = ({ cities, currentFilters }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    city: currentFilters.city || '',
    stars: currentFilters.stars || '',
    search: currentFilters.search || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
    amenities: currentFilters.amenities || ''
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [sortBy, setSortBy] = useState(currentFilters.sort || '');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    if (filters.maxPrice) {
      setPriceRange([priceRange[0], parseInt(filters.maxPrice) || 100000]);
    }
  }, [filters.maxPrice]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
    setFilters({ ...filters, maxPrice: value.toString() });
  };

  const handleAmenityChange = (amenity) => {
    const currentAmenities = filters.amenities ? filters.amenities.split(',') : [];
    if (currentAmenities.includes(amenity)) {
      const newAmenities = currentAmenities.filter(a => a !== amenity);
      setFilters({ ...filters, amenities: newAmenities.join(',') });
    } else {
      const newAmenities = [...currentAmenities, amenity];
      setFilters({ ...filters, amenities: newAmenities.join(',') });
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    applyFilters(value);
  };

  const applyFilters = (sortValue = sortBy) => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.stars) params.append('stars', filters.stars);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.amenities) params.append('amenities', filters.amenities);
    if (sortValue) params.append('sort', sortValue);
    navigate(`/hotels?${params.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters();
    setIsMobileOpen(false);
  };

  const handleReset = () => {
    setFilters({ city: '', stars: '', search: '', minPrice: '', maxPrice: '', amenities: '' });
    setSortBy('');
    setPriceRange([0, 100000]);
    navigate('/hotels');
    setIsMobileOpen(false);
  };

  const starOptions = [5, 4, 3, 2, 1];
  const amenitiesList = [
    { name: 'WiFi', icon: <FaWifi /> },
    { name: 'Swimming Pool', icon: <FaSwimmer /> },
    { name: 'Restaurant', icon: <FaUtensils /> },
    { name: 'Gym', icon: <FaDumbbell /> }
  ];

  const activeFiltersCount = [
    filters.city, filters.stars, filters.search, 
    filters.minPrice, filters.maxPrice, filters.amenities
  ].filter(Boolean).length;

  return (
    <>
      <button 
        className="lg:hidden w-full bg-blue-900 text-white py-3 rounded-lg mb-4 flex items-center justify-center gap-2 font-semibold"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <FaFilter /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </button>
      
      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg shadow-md p-5 sticky top-24`}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaFilter className="text-blue-900" /> Filters
          </h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleReset} className="text-sm text-red-500 hover:underline flex items-center gap-1">
              <FaTimes /> Clear all
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaSearch className="text-blue-900" /> Search Hotels
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Hotel name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaCity className="text-blue-900" /> City
            </label>
            <select
              name="city"
              value={filters.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaStar className="text-yellow-500" /> Star Rating
            </label>
            <select
              name="stars"
              value={filters.stars}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Any Stars</option>
              {starOptions.map(star => (
                <option key={star} value={star}>{'★'.repeat(star)} ({star} Star)</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaDollarSign className="text-green-600" /> Price Range (PKR)
            </label>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>PKR 0</span>
              <span className="font-semibold text-blue-900">PKR {priceRange[1].toLocaleString()}</span>
              <span>PKR 100,000+</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-2 gap-2">
              {amenitiesList.map((amenity, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={(filters.amenities || '').split(',').includes(amenity.name)}
                    onChange={() => handleAmenityChange(amenity.name)}
                    className="w-4 h-4 text-blue-900 rounded"
                  />
                  <span className="flex items-center gap-1 text-sm">{amenity.icon} {amenity.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaSort className="text-blue-900" /> Sort By
            </label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="stars_desc">Stars: High to Low</option>
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button type="submit" className="bg-blue-900 text-white flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-blue-800 transition font-semibold">
              <FaSearch /> Search
            </button>
            <button type="button" onClick={handleReset} className="border-2 border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchFilters;