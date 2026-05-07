import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { FaEnvelope, FaEye, FaReply, FaTrash, FaCheckCircle, FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/contacts');
      setContacts(res.data.contacts);
      setStats(res.data.stats);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/admin/contacts/${id}/read`);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleReply = async (id) => {
    if (!replyMessage.trim()) {
      toast.error('Please enter a reply message');
      return;
    }
    
    setSendingReply(true);
    try {
      const response = await api.put(`/admin/contacts/${id}/reply`, { replyMessage });
      toast.success(response.data.message || 'Reply sent successfully!');
      setShowReplyModal(false);
      setReplyMessage('');
      fetchContacts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/admin/contacts/${id}`);
        toast.success('Message deleted');
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'unread':
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Unread</span>;
      case 'read':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Read</span>;
      case 'replied':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Replied</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  if (loading) return <AdminLayout><div className="flex justify-center items-center h-64">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
            <p className="text-gray-500 text-sm">Manage customer inquiries and support messages</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaEnvelope className="text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-500">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <FaClock className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.unread}</p>
                <p className="text-sm text-gray-500">Unread</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaEye className="text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.read}</p>
                <p className="text-sm text-gray-500">Read</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.replied}</p>
                <p className="text-sm text-gray-500">Replied</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      No messages yet
                     </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact._id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{contact.name}</td>
                      <td className="px-4 py-3">{contact.email}</td>
                      <td className="px-4 py-3">{contact.subject}</td>
                      <td className="px-4 py-3 text-sm">{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{getStatusBadge(contact.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowReplyModal(true);
                              if (contact.status === 'unread') {
                                handleMarkAsRead(contact._id);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="View & Reply"
                          >
                            <FaEye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(contact._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete"
                          >
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

        {/* View/Reply Modal */}
        {showReplyModal && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">Reply to {selectedContact.name}</h2>
                <button onClick={() => setShowReplyModal(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <p className="text-gray-900">{selectedContact.name} ({selectedContact.email})</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900 font-semibold">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Received</label>
                  <p className="text-gray-500 text-sm">{new Date(selectedContact.createdAt).toLocaleString()}</p>
                </div>

                {selectedContact.replyMessage && (
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-1">Previous Reply</label>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-700">{selectedContact.replyMessage}</p>
                      <p className="text-xs text-green-500 mt-2">Replied on: {new Date(selectedContact.repliedAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply (Will be sent via email)</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your reply here... The customer will receive this via email."
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleReply(selectedContact._id)}
                    disabled={sendingReply}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sendingReply ? 'Sending...' : <><FaPaperPlane /> Send Reply via Email</>}
                  </button>
                  <button 
                    onClick={() => setShowReplyModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <FaEnvelope /> The customer will receive this reply via email automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageContacts;