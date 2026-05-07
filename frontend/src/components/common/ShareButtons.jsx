import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ShareButtons = ({ hotelName, hotelId }) => {
  const [copied, setCopied] = useState(false);
  
  const url = `${window.location.origin}/hotels/${hotelId}`;
  const text = `Check out ${hotelName} on LuxeStay!`;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button onClick={shareOnFacebook} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
        <FaFacebook />
      </button>
      <button onClick={shareOnTwitter} className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600 transition">
        <FaTwitter />
      </button>
      <button onClick={shareOnWhatsApp} className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
        <FaWhatsapp />
      </button>
      <button onClick={copyLink} className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition">
        {copied ? <FaCheck /> : <FaCopy />}
      </button>
    </div>
  );
};

export default ShareButtons;