import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content - with margin to accommodate fixed sidebar */}
      <div className="ml-64 flex-1 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;