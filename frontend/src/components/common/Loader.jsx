import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50">
      <div className="text-center">
        <div className="spinner mx-auto mb-6"></div>
        <p className="text-blue-900 font-semibold text-lg animate-pulse">Loading amazing experiences...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait</p>
      </div>
    </div>
  );
};

export default Loader;