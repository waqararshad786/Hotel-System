import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllHotelsAdmin, createHotel, updateHotel, deleteHotel } from '../../services/adminService';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    stars: 3,
    emoji: '🏨',
    amenities: '',
    pricePerNight: ''
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await getAllHotelsAdmin();
      setHotels(res.data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('stars', formData.stars.toString());
    formDataToSend.append('emoji', formData.emoji);
    formDataToSend.append('pricePerNight', formData.pricePerNight);
    formDataToSend.append('amenities', JSON.stringify(formData.amenities.split(',').map(a => a.trim())));
    
    imageFiles.forEach((file) => {
      formDataToSend.append('images', file);
    });
    
    try {
      if (editingHotel) {
        await updateHotel(editingHotel._id, formDataToSend);
        toast.success('Hotel updated successfully');
      } else {
        await createHotel(formDataToSend);
        toast.success('Hotel created successfully');
      }
      fetchHotels();
      closeModal();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.response?.data?.message || 'Failed to save hotel');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await deleteHotel(id);
        toast.success('Hotel deleted successfully');
        fetchHotels();
      } catch (error) {
        toast.error('Failed to delete hotel');
      }
    }
  };

  const openModal = (hotel = null) => {
    if (hotel) {
      setEditingHotel(hotel);
      setFormData({
        name: hotel.name,
        city: hotel.city,
        address: hotel.address,
        description: hotel.description,
        stars: hotel.stars,
        emoji: hotel.emoji,
        amenities: hotel.amenities?.join(', ') || '',
        pricePerNight: hotel.pricePerNight || ''
      });
      setImagePreviews(hotel.images || []);
      setImageFiles([]);
    } else {
      setEditingHotel(null);
      setFormData({
        name: '',
        city: '',
        address: '',
        description: '',
        stars: 3,
        emoji: '🏨',
        amenities: '',
        pricePerNight: ''
      });
      setImagePreviews([]);
      setImageFiles([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHotel(null);
    setImagePreviews([]);
    setImageFiles([]);
  };

  if (loading) return <AdminLayout><div className="flex justify-center items-center h-64">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Hotels</h1>
          <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <FaPlus /> Add Hotel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">City</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price/Night</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stars</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No hotels found. Click "Add Hotel" to create one.
                    </td>
                  </tr>
                ) : (
                  hotels.map((hotel) => (
                    <tr key={hotel._id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <img 
                          src={getImageUrl(hotel.images?.[0]) || fallbackImage}
                          alt={hotel.name}
                          className="w-12 h-12 object-cover rounded"
                          onError={(e) => { e.target.src = fallbackImage; }}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">{hotel.name}</td>
                      <td className="px-4 py-3 text-gray-600">{hotel.city}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-blue-600">
                          PKR {hotel.pricePerNight?.toLocaleString() || '0'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < hotel.stars ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openModal(hotel)} className="text-blue-600 hover:text-blue-800 p-1 transition" title="Edit Hotel">
                            <FaEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(hotel._id)} className="text-red-600 hover:text-red-800 p-1 transition" title="Delete Hotel">
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition">
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Pearl Continental"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Lahore"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Full hotel address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Hotel description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night (PKR) *</label>
                    <input
                      type="number"
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      required
                      placeholder="e.g., 15000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stars (1-5) *</label>
                    <select
                      value={formData.stars}
                      onChange={(e) => setFormData({...formData, stars: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                    <input
                      type="text"
                      value={formData.emoji}
                      onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                      placeholder="WiFi, Pool, Restaurant, Gym"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="hotel-images"
                    />
                    <label htmlFor="hotel-images" className="cursor-pointer flex flex-col items-center">
                      <FaUpload className="text-gray-400 text-4xl mb-2" />
                      <span className="text-gray-500">Click to upload images</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    </label>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">{imagePreviews.length} image(s) selected</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded-lg border border-gray-200" />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                              <FaTimes size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium">
                    {editingHotel ? 'Update Hotel' : 'Create Hotel'}
                  </button>
                  <button type="button" onClick={closeModal} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageHotels;