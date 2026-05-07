import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'travel-tips', name: 'Travel Tips', count: 4 },
    { id: 'destinations', name: 'Destinations', count: 3 },
    { id: 'hotels', name: 'Hotel Reviews', count: 3 },
    { id: 'news', name: 'News & Offers', count: 2 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for First-Time Travelers to Pakistan',
      excerpt: 'Planning your first trip to Pakistan? Here are essential tips to make your journey memorable and hassle-free...',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
      author: 'Ahmed Raza',
      date: 'January 15, 2024',
      category: 'travel-tips',
      readTime: '5 min read',
      tags: ['Travel Tips', 'Pakistan']
    },
    {
      id: 2,
      title: 'Top 5 Luxury Hotels in Lahore',
      excerpt: 'Discover the most luxurious accommodations in the cultural heart of Pakistan. From historic palaces to modern marvels...',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      author: 'Sana Khan',
      date: 'January 10, 2024',
      category: 'hotels',
      readTime: '4 min read',
      tags: ['Lahore', 'Luxury Hotels']
    },
    {
      id: 3,
      title: 'Complete Guide to Northern Areas of Pakistan',
      excerpt: 'Explore the breathtaking beauty of Hunza, Skardu, and Fairy Meadows. Your ultimate travel guide to paradise...',
      image: 'https://images.unsplash.com/photo-1598977127912-c847f0c1960a',
      author: 'Usman Chaudhry',
      date: 'January 5, 2024',
      category: 'destinations',
      readTime: '8 min read',
      tags: ['Northern Areas', 'Adventure']
    },
    {
      id: 4,
      title: 'Best Time to Visit Karachi',
      excerpt: 'Planning a trip to the city of lights? Here\'s when to go for the best weather and experiences...',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      author: 'Fatima Zafar',
      date: 'December 28, 2023',
      category: 'destinations',
      readTime: '6 min read',
      tags: ['Karachi', 'Travel Guide']
    },
    {
      id: 5,
      title: 'How to Get the Best Hotel Deals',
      excerpt: 'Expert tips and tricks to save money on hotel bookings without compromising on quality...',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
      author: 'Ahmed Raza',
      date: 'December 20, 2023',
      category: 'travel-tips',
      readTime: '3 min read',
      tags: ['Budget Travel', 'Deals']
    },
    {
      id: 6,
      title: 'LuxeStay Announces Summer Special Offers',
      excerpt: 'Get up to 30% off on luxury hotel bookings this summer. Limited time offer!',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      author: 'Marketing Team',
      date: 'December 15, 2023',
      category: 'news',
      readTime: '2 min read',
      tags: ['Offers', 'Summer']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Travel Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover travel tips, destination guides, and the latest news from LuxeStay
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="relative rounded-xl overflow-hidden h-96">
          <img 
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm mb-3 inline-block">
              Featured Article
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{featuredPost.title}</h2>
            <p className="text-lg mb-4 opacity-90">{featuredPost.excerpt.substring(0, 150)}...</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><FaUser /> {featuredPost.author}</span>
              <span className="flex items-center gap-1"><FaCalendar /> {featuredPost.date}</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <Link 
              to={`/blog/${featuredPost.id}`}
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-2 rounded-lg mt-4 hover:bg-gray-100 transition"
            >
              Read More <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="text-blue-900 font-semibold">
                  {categories.find(c => c.id === post.category)?.name}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.readTime}</span>
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-blue-900 font-semibold hover:underline flex items-center gap-1"
                >
                  Read More <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="mb-6">Get the latest travel tips and exclusive offers straight to your inbox</p>
        <form className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button className="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blog;