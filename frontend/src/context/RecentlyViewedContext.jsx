import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const RecentlyViewedContext = createContext();

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const isMounted = useRef(true);

  // Load from localStorage only once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentlyViewed');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentlyViewed(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Add to recently viewed
  const addToRecentlyViewed = useCallback((hotel) => {
    if (!hotel || !hotel._id) return;
    
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(h => h._id !== hotel._id);
      // Add to beginning
      const newList = [hotel, ...filtered];
      // Keep only last 6
      const limited = newList.slice(0, 6);
      // Save to localStorage
      try {
        localStorage.setItem('recentlyViewed', JSON.stringify(limited));
      } catch (error) {
        console.error('Error saving:', error);
      }
      return limited;
    });
  }, []);

  // Clear all recently viewed
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem('recentlyViewed');
    } catch (error) {
      console.error('Error clearing:', error);
    }
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ 
      recentlyViewed, 
      addToRecentlyViewed, 
      clearRecentlyViewed 
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};