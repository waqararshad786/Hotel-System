import React, { useState } from 'react';
import { FaStar, FaCalendar, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ReviewSection = ({ hotelId, reviews: initialReviews }) => {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState(initialReviews || []);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write your review');
      return;
    }

    setSubmitting(true);
    
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        userName: user.name,
        userEmail: user.email,
        rating,
        comment,
        date: new Date().toISOString(),
        verified: true
      };
      setReviews([newReview, ...reviews]);
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
      setSubmitting(false);
    }, 1000);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
      
      <div className="flex flex-wrap gap-8 mb-6 pb-6 border-b">
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-900">{calculateAverageRating()}</div>
          <div className="flex text-yellow-500 my-1">
            {[1,2,3,4,5].map(star => (
              <FaStar key={star} className={star <= Math.round(calculateAverageRating()) ? 'text-yellow-500' : 'text-gray-300'} />
            ))}
          </div>
          <div className="text-gray-500 text-sm">{totalReviews} reviews</div>
        </div>
        
        <div className="flex-1 space-y-1">
          {[5,4,3,2,1].map(star => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-sm w-8">{star}★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${totalReviews ? (ratingDistribution[star] / totalReviews) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-12">{ratingDistribution[star]}</span>
            </div>
          ))}
        </div>
      </div>
      
      {isAuthenticated && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Write a Review</h4>
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <FaStar className={(hoverRating >= star || rating >= star) ? 'text-yellow-500' : 'text-gray-300'} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 mb-3"
          />
          <button
            onClick={handleSubmitReview}
            disabled={submitting}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      )}
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold flex items-center gap-2">
                    <FaUser className="text-gray-400" /> {review.userName}
                  </span>
                  {review.verified && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified Guest</span>
                  )}
                </div>
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map(star => (
                    <FaStar key={star} className={star <= review.rating ? 'text-yellow-500' : 'text-gray-300'} size={12} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FaCalendar /> {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;