// Helper function to get image URL
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('blob:')) return imagePath;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    if (imagePath.startsWith('uploads')) return `http://localhost:5000/${imagePath}`;
    return `http://localhost:5000/${imagePath}`;
};

// Fallback image
export const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500';