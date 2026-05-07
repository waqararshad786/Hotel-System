import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWishlist(parsed);
      } catch (e) {
        console.error('Error parsing wishlist:', e);
      }
    }
  }, []);

  const addToWishlist = (hotel) => {
    // Make sure we have all hotel data including images
    const hotelToSave = {
      _id: hotel._id,
      name: hotel.name,
      city: hotel.city,
      stars: hotel.stars,
      rating: hotel.rating,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      images: hotel.images || [],  // ✅ Ensure images are saved
      emoji: hotel.emoji
    };
    
    if (!wishlist.find(h => h._id === hotel._id)) {
      const newWishlist = [...wishlist, hotelToSave];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      toast.success('Added to wishlist ❤️');
    } else {
      toast.error('Already in wishlist');
    }
  };

  const removeFromWishlist = (hotelId) => {
    const newWishlist = wishlist.filter(h => h._id !== hotelId);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (hotelId) => {
    return wishlist.some(h => h._id === hotelId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};