import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getHotels, getCities } from '../services/hotelService';
import HotelCard from '../components/hotels/HotelCard';
import SearchFilters from '../components/hotels/SearchFilters';
import Loader from '../components/common/Loader';
import { FaFrown } from 'react-icons/fa';

const Hotels = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    stars: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    amenities: '',
    sort: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      city: params.get('city') || '',
      stars: params.get('stars') || '',
      search: params.get('search') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      amenities: params.get('amenities') || '',
      sort: params.get('sort') || ''
    });
  }, [location.search]);

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, [filters]);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {};
      if (filters.city) queryParams.city = filters.city;
      if (filters.stars) queryParams.stars = filters.stars;
      if (filters.search) queryParams.search = filters.search;
      if (filters.minPrice) queryParams.minPrice = filters.minPrice;
      if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
      if (filters.amenities) queryParams.amenities = filters.amenities;
      
      const res = await getHotels(queryParams);
      let hotelData = res.data.hotels || [];
      
      // Apply sorting
      if (filters.sort === 'price_asc') {
        hotelData = [...hotelData].sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else if (filters.sort === 'price_desc') {
        hotelData = [...hotelData].sort((a, b) => b.pricePerNight - a.pricePerNight);
      } else if (filters.sort === 'rating_desc') {
        hotelData = [...hotelData].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (filters.sort === 'stars_desc') {
        hotelData = [...hotelData].sort((a, b) => b.stars - a.stars);
      }
      
      setHotels(hotelData);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to load hotels. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await getCities();
      setCities(res.data.cities || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find Your Perfect Stay</h1>
        <p className="text-gray-600">Discover the best hotels across Pakistan</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchFilters cities={cities} currentFilters={filters} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              <span className="font-semibold text-blue-900">{hotels.length}</span> hotels found
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
              <button onClick={fetchHotels} className="mt-2 text-blue-600 hover:underline">
                Try Again
              </button>
            </div>
          )}
          
          {!error && hotels.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FaFrown className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No hotels found matching your criteria</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotels.map(hotel => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;