import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllHotelsAdmin } from '../../services/adminService';
import { createRoom, updateRoom, deleteRoom, getRoomsByHotel } from '../../services/roomService';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUpload } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: 'standard',
    description: '',
    pricePerNight: '',
    capacity: 2,
    amenities: '',
    roomNumber: '',
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (selectedHotel) {
      fetchRooms();
    }
  }, [selectedHotel]);

  const fetchHotels = async () => {
    try {
      const res = await getAllHotelsAdmin();
      setHotels(res.data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to fetch hotels');
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await getRoomsByHotel(selectedHotel);
      setRooms(res.data.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to fetch rooms');
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

  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"%3E%3Crect width="50" height="50" fill="%23e5e7eb"/%3E%3Ctext x="25" y="25" text-anchor="middle" dominant-baseline="middle" fill="%239ca3af" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Selected room files:', files);
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
    formDataToSend.append('hotel', selectedHotel);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('pricePerNight', formData.pricePerNight);
    formDataToSend.append('capacity', formData.capacity);
    formDataToSend.append('roomNumber', formData.roomNumber);
    formDataToSend.append('amenities', JSON.stringify(formData.amenities.split(',').map(a => a.trim())));
    
    // Append each image file
    imageFiles.forEach((file, index) => {
      console.log(`Appending room file ${index}:`, file.name);
      formDataToSend.append('images', file);
    });
    
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, formDataToSend);
        toast.success('Room updated successfully');
      } else {
        await createRoom(formDataToSend);
        toast.success('Room created successfully');
      }
      fetchRooms();
      closeModal();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to save room');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id);
        toast.success('Room deleted successfully');
        fetchRooms();
      } catch (error) {
        toast.error('Failed to delete room');
      }
    }
  };

  const openModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        type: room.type,
        description: room.description,
        pricePerNight: room.pricePerNight,
        capacity: room.capacity,
        amenities: room.amenities?.join(', ') || '',
        roomNumber: room.roomNumber,
      });
      setImagePreviews(room.images || []);
      setImageFiles([]);
    } else {
      setEditingRoom(null);
      setFormData({
        name: '',
        type: 'standard',
        description: '',
        pricePerNight: '',
        capacity: 2,
        amenities: '',
        roomNumber: '',
      });
      setImagePreviews([]);
      setImageFiles([]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRoom(null);
    setImagePreviews([]);
    setImageFiles([]);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Rooms</h1>
        </div>
        
        {/* Hotel Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <label className="block text-gray-700 font-medium mb-2">Select Hotel</label>
          <select
            value={selectedHotel}
            onChange={(e) => setSelectedHotel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="">-- Choose a hotel --</option>
            {hotels.map(hotel => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.emoji} {hotel.name} - {hotel.city}
              </option>
            ))}
          </select>
        </div>
        
        {selectedHotel && (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                <FaPlus /> Add Room
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Image</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Room No</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                          No rooms found. Click "Add Room" to create one.
                        </td>
                      </tr>
                    ) : (
                      rooms.map((room) => (
                        <tr key={room._id} className="border-t hover:bg-gray-50 transition">
                          <td className="px-4 py-3">
                            <img 
                              src={getImageUrl(room.images?.[0]) || fallbackImage}
                              alt={room.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => { e.target.src = fallbackImage; }}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium">{room.roomNumber}</td>
                          <td className="px-4 py-3">{room.name}</td>
                          <td className="px-4 py-3 capitalize">{room.type}</td>
                          <td className="px-4 py-3">PKR {room.pricePerNight?.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openModal(room)} className="text-blue-600 hover:text-blue-800 p-1">
                                <FaEdit size={18} />
                              </button>
                              <button onClick={() => handleDelete(room._id)} className="text-red-600 hover:text-red-800 p-1">
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
          </>
        )}
        
        {/* Add/Edit Room Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <FaTimes size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                    <input
                      type="text"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 101"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Deluxe Suite"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="standard">Standard</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                      <option value="presidential">Presidential</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night (PKR) *</label>
                    <input
                      type="number"
                      value={formData.pricePerNight}
                      onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 15000"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Guests) *</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                      placeholder="WiFi, AC, TV, Mini Bar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Room description"
                  />
                </div>
                
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="room-images"
                    />
                    <label htmlFor="room-images" className="cursor-pointer flex flex-col items-center">
                      <FaUpload className="text-gray-400 text-4xl mb-2" />
                      <span className="text-gray-500">Click to upload room images</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    </label>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">{imagePreviews.length} image(s) selected</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative group">
                            <img 
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-20 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                            >
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
                    {editingRoom ? 'Update Room' : 'Create Room'}
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

export default ManageRooms;